import React, { useCallback, useEffect, useRef, useState } from "react";
import Course, { CourseData } from "../components/Course";
import Dialogue, { DialogueTypes } from "../components/Dialogue";
import { arrayChunk, calculator, copier } from "../utils/helpers";

interface HomeProps {
	clearBodyStyles: () => void;
}

export default function Home({ clearBodyStyles }: HomeProps) {
	const [toggleAlert, setToggleAlert] = useState<null | string>(null);
	const [toggleAddCourses, setToggleAddCourses] = useState(false);
	const [toggleClearCourses, setToggleClearCourses] = useState(false);
	const [toggleReviewCourses, setToggleReviewCourses] = useState(false);

	const [courses, setCourses] = useState<null | CourseData[]>(null);

	const [resultData, setResultData] = useState("");
	const resultInput = useRef<null | HTMLTextAreaElement>(null);
	const [useAddedCourses, setUseAddedCourses] = useState(false);

	// processed result data
	const firstThreeColsCount = useRef(3); // (S/N, Scholar's Name, and Matric No.)
	const lastFiveColsCount = useRef(5); // (Total Units, Units Passed, Carry Over Units, GP, GPA)
	const [cleanedResultData, setCleanedResultData] = useState<null | string[]>(
		null
	);

	const resultContainer = useRef<null | HTMLDivElement>(null);
	const [showCalcResult, setShowCalcResult] = useState<null | string[][]>(null);
	const [resultTableCopied, setResultTableCopied] = useState(false);

	useEffect(() => {
		// clear init body styles
		clearBodyStyles();
		// get couses stored in localstorage
		setCourses(handleGetLocalCourses());
	}, [clearBodyStyles]);

	useEffect(() => {
		if (!courses || courses.length <= 0) {
			setUseAddedCourses(false);
			setShowCalcResult(null);
		}
	}, [courses]);

	const handleGetLocalCourses = () => {
		let localCourses = window.localStorage.getItem("courses");
		if (!localCourses) {
			return null;
		}
		return JSON.parse(localCourses) as CourseData[];
	};

	const handleAddCourses = useCallback(
		(size: string) => {
			setToggleAddCourses(false);

			// validate if size is a numeral
			if (!/^\d+$/.test(size)) {
				return setTimeout(
					() => setToggleAlert("Please enter a valid numeral."),
					50
				);
			}

			// generate courses inputs
			const newCourses: CourseData[] = [];
			for (let i = 0; i < parseInt(size); i++) {
				newCourses.push(["", 0, 40]);
			}

			// store courses
			const coursesToStore = (courses || []).concat(newCourses);
			setCourses(coursesToStore);
			window.localStorage.setItem("courses", JSON.stringify(coursesToStore));
		},
		[courses]
	);

	const handleClearCourses = useCallback(() => {
		setToggleClearCourses(false);
		window.localStorage.removeItem("courses");
		setCourses(null);
	}, []);

	const handleCourseUpdate = useCallback(
		(index: number, data: CourseData) => {
			const existingCourses = courses || handleGetLocalCourses() || [];
			const targetCourseIndex = existingCourses.findIndex(
				(e, i) => i === index
			);
			if (targetCourseIndex === -1) {
				return;
			}
			existingCourses[targetCourseIndex] = data;
			window.localStorage.setItem("courses", JSON.stringify(existingCourses));
			setCourses(existingCourses);
		},
		[courses]
	);

	const handleCalculation = useCallback(() => {
		try {
			setToggleReviewCourses(false);

			// val courses
			if (!courses || courses.length <= 0) {
				throw new Error("Oops, please add course(s) to continue.");
			}

			// tranform result data into array chunks and extract each row first three cols
			// each chunk represents each row of the result
			const resultDataFirstThreeCols: string[][] = [];
			const resultDataChunks: string[][] = arrayChunk(
				firstThreeColsCount.current + courses.length,
				cleanedResultData || []
			).map((row) => {
				resultDataFirstThreeCols.push(
					row.splice(0, firstThreeColsCount.current)
				);
				return row;
			});

			// val if total number each resultDataChunks is equal to total number of courses
			if (
				resultDataChunks.length <= 0 ||
				resultDataChunks.some((row) => row.length !== courses.length)
			) {
				throw new Error("Oops, invalid result sheet format.");
			}

			// perform calculation
			const gradedResultScores: string[][] = [];
			const calcResultScores: string[][] = [];
			resultDataChunks.forEach((dataChunk) => {
				const { gradedScores, calcScores } = calculator(dataChunk, courses);
				gradedResultScores.push(gradedScores);
				calcResultScores.push(calcScores);
			});

			// assemble calc result into rows
			const calcResult = resultDataFirstThreeCols.map((row, i) =>
				row.concat(gradedResultScores[i], calcResultScores[i])
			);

			// display calc result
			setShowCalcResult(calcResult);

			// scroll into table
			setTimeout(
				() => resultContainer.current?.scrollIntoView({ block: "start" }),
				50
			);
		} catch (error) {
			setTimeout(() => setToggleAlert((error as Error).message), 50);
		}
	}, [cleanedResultData, courses]);

	const handleCleanResultdata = useCallback(
		(e: React.FormEvent) => {
			try {
				e.preventDefault();

				// reset neccessary states
				setShowCalcResult(null);
				setCleanedResultData(null);

				// val if file is a spreadsheet
				if (!/\t/.test(resultData)) {
					throw new Error(
						"Ooops, it appears that result data is not a spreadsheet."
					);
				}

				// clean result data
				let _cleanedResultData = resultData
					.split(/(\t|\n)/)
					.map((e) => e.replace(/(\\t|\\n)/g, " "))
					.map((e) => e.trim())
					.filter((e) => e !== "")
					.reduce((arr: string[], itm: string) => {
						if (/^(\d{1,3}[A-F]+)$/i.test(itm)) {
							itm = itm.replace(/[A-F]/gi, "");
						}
						arr.push(itm);
						return arr;
					}, []);

				// get result data headings
				// GPA will be used to identify where headings stops
				const headingsLastItemIndex = _cleanedResultData.findIndex(
					(e) => e.toLowerCase().replace(/\./g, "") === "gpa"
				);
				if (headingsLastItemIndex === -1) {
					throw new Error("Oops, invalid result data format.");
				}
				const headings = _cleanedResultData.splice(
					0,
					headingsLastItemIndex + 1
				);

				// get result data course titles
				const _courseTitles = headings.slice(
					firstThreeColsCount.current,
					headings.length - lastFiveColsCount.current
				);

				// get result data course units
				const _courseUnits = _cleanedResultData
					.splice(0, _courseTitles.length)
					.map((e) => parseInt(e))
					.map((e) => (isNaN(e) ? 0 : e));

				// update util states
				setCleanedResultData(_cleanedResultData);

				// val whether to add courses
				if (!useAddedCourses) {
					setCourses(null);
					const newCourses: CourseData[] = [];
					for (let i = 0; i < _courseTitles.length; i++) {
						newCourses.push([_courseTitles[i], _courseUnits[i], 40]);
					}
					const coursesToStore = ([] as CourseData[]).concat(newCourses);
					setTimeout(() => {
						setCourses(coursesToStore);
						window.localStorage.setItem(
							"courses",
							JSON.stringify(coursesToStore)
						);
					}, 50);
				}

				// toggle added courses confirmation before calculation
				setToggleReviewCourses(true);
			} catch (error) {
				setToggleAlert((error as Error).message);
			}
		},
		[resultData, useAddedCourses]
	);

	return (
		<>
			<header>
				<nav className="doc-width p-tb-10 p-lr-20 flex justify-content-between align-items-center">
					<h1>GPCALC</h1>
				</nav>
			</header>
			<main className="p-tb-20 main-section">
				<div className="doc-width p-lr-20">
					<div className="m-t-10 p-10 --warning">
						<p>
							<strong style={{ fontSize: "16px" }}>Note: </strong>
							<span>
								For accuracy and performant calculation, use the following
								format;
							</span>
						</p>
						<ul className="m-t-10" style={{ paddingLeft: "20px" }}>
							<li>Do not leave any score column empty</li>
							<li>
								Use EL (ie. elective) in place of score for a course the student
								does/did not offer
							</li>
							<li>You can also use NIL in place of 0 (zero)</li>
							<li>Use AB (ie. absent) for an absentee</li>
							<li>
								<a
									href="composite-result-template.xlsx"
									target="_blank"
									rel="noreferrer"
								>
									Click here
								</a>
								<span>{" to download a sample of a result sheet."}</span>
							</li>
						</ul>
					</div>
					<div className="p-tb-10 flex justify-content-end m-t-20">
						<button
							className="p-10 m-r-10"
							onClick={() => setToggleClearCourses(true)}
							disabled={courses && courses.length > 0 ? false : true}
						>
							Clear Courses
						</button>
						<button className="p-10" onClick={() => setToggleAddCourses(true)}>
							Add Courses
						</button>
					</div>
					<form onSubmit={handleCleanResultdata}>
						<div className="p-tb-10">
							<h3>Courses</h3>
							<div className="flex flex-wrap">
								{courses ? (
									courses?.map((d, _i) => (
										<Course
											key={_i}
											data={d}
											index={_i}
											courseUpdate={handleCourseUpdate}
										/>
									))
								) : (
									<p style={{ marginTop: "10px", textAlign: "left" }}>
										Course(s) are automatically added, optionally you can use
										the "Add Courses" button to manually add course(s).
									</p>
								)}
							</div>
						</div>
						<div className="selector m-t-20">
							<div className="selector-elems">
								<label htmlFor="resultTable">
									<h3>Result sheet</h3>
								</label>
								<div className="m-t-10" style={{ position: "relative" }}>
									{resultData !== "" && (
										<button
											type="button"
											style={{
												backgroundColor: "rgba(68, 68, 68, 0.4)",
												color: "#fff",
												position: "absolute",
												top: "10px",
												right: "10px",
												padding: "5px 10px",
												border: "none",
											}}
											onClick={() => {
												setResultData("");
												resultInput.current && (resultInput.current.value = "");
											}}
										>
											Clear
										</button>
									)}
									<textarea
										className="p-10"
										cols={30}
										rows={10}
										id="resultTable"
										placeholder="Paste result spreadsheet here"
										onInput={(e) => setResultData(e.currentTarget.value.trim())}
										ref={resultInput}
										required
									/>
								</div>
								{courses && courses.length > 0 && (
									<div className="m-t-10">
										<label>
											<input
												type="checkbox"
												className="m-r-10"
												onChange={() => setUseAddedCourses(!useAddedCourses)}
												checked={useAddedCourses}
											/>
											<span style={{ userSelect: "none" }}>
												Use existing added courses
											</span>
										</label>
									</div>
								)}
								<div
									className="flex flex-wrap align-items-center --flex"
									style={{ marginTop: "30px" }}
								>
									<button type="submit" className="p-10 m-r-10">
										Calculate
									</button>
								</div>
							</div>
						</div>
					</form>
					<div className="text-center m-t-20 p-tb-20" ref={resultContainer}>
						{showCalcResult ? (
							<>
								<div className="flex justify-content-end flex-wrap">
									<button
										className="p-5 p-lr-10"
										style={{ marginRight: "10px" }}
										onClick={() =>
											copier(
												resultContainer.current?.children[1],
												() => {
													setResultTableCopied(true);
													setTimeout(() => {
														setResultTableCopied(false);
													}, 3 * 1000);
												},
												() =>
													setToggleAlert(
														"Copy comman failed, please try using native method."
													)
											)
										}
										disabled={resultTableCopied}
									>
										{resultTableCopied ? "Copied" : "Copy"}
									</button>
									<button
										className="p-5 p-lr-10"
										onClick={() => setShowCalcResult(null)}
									>
										Clear
									</button>
								</div>
								<div className="--result-table-wrap p-tb-10">
									<table>
										<thead>
											<tr>
												<th rowSpan={2}>S/N</th>
												<th rowSpan={2}>SCHOLAR’S NAME</th>
												<th rowSpan={2}>MATRIC NO</th>
												{courses?.map((e, i) => (
													<th key={i}>{e[0]}</th>
												))}
												<th rowSpan={2}>TOTAL UNITS</th>
												<th rowSpan={2}>UNITS PASSED</th>
												<th rowSpan={2}>CARRY OVER UNITS</th>
												<th rowSpan={2}>GP</th>
												<th rowSpan={2}>GPA</th>
											</tr>
											<tr>
												{courses?.map((e, i) => (
													<th key={i}>{e[1]}</th>
												))}
											</tr>
										</thead>
										<tbody>
											{showCalcResult.map((row, i) => (
												<tr key={i}>
													{row.map((col, _i) => (
														<td key={_i}>{col}</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</>
						) : (
							"Calculated result will appear here..."
						)}
					</div>
				</div>
			</main>
			<footer>
				{/* <div
					className="flex justify-content-center flex-wrap"
					style={{ marginBottom: "15px" }}
				>
					<button type="button" className="p-5 p-lr-10">
						Update
					</button>
				</div> */}
				<div className="text-center doc-width p-lr-10">
					<span>
						&copy;
						{" " + new Date().getFullYear() + " "}
					</span>
					<a
						href="https://24cipher.com?ref=gpcalc"
						target="_blank"
						rel="noreferrer"
					>
						24Cipher Labs
					</a>
					<span>{" Software License & Usage."}</span>
				</div>
			</footer>
			{toggleAddCourses && (
				<Dialogue
					info="How many courses do you want to add?"
					type={DialogueTypes.prompt}
					callbackOk={handleAddCourses}
					callbackCancel={() => setToggleAddCourses(false)}
				/>
			)}
			{toggleAlert && (
				<Dialogue
					info={toggleAlert}
					type={DialogueTypes.alert}
					callbackOk={() => setToggleAlert(null)}
				/>
			)}
			{toggleClearCourses && (
				<Dialogue
					info="Are you sure you want to clear courses?"
					type={DialogueTypes.confirm}
					callbackOk={handleClearCourses}
					callbackCancel={() => setToggleClearCourses(false)}
				/>
			)}
			{toggleReviewCourses && (
				<Dialogue
					info="Do you want to continue without reviewing added courses?"
					type={DialogueTypes.confirm}
					callbackOk={handleCalculation}
					callbackCancel={() => setToggleReviewCourses(false)}
				/>
			)}
		</>
	);
}
