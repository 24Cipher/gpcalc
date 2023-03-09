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

	const [courses, setCourses] = useState<null | CourseData[]>(null);

	const [isComposite, setIsComposite] = useState(true);
	const resultInput = useRef<null | HTMLTextAreaElement>(null);

	const resultContainer = useRef<null | HTMLDivElement>(null);
	const [showCalcResult, setShowCalcResult] = useState<null | string[][]>(null);
	const [resultTableCopied, setResultTableCopied] = useState(false);

	const handleGetLocalCourses = () => {
		let localCourses = window.localStorage.getItem("courses");
		if (!localCourses) {
			return null;
		}
		return JSON.parse(localCourses) as CourseData[];
	};

	useEffect(() => {
		clearBodyStyles();

		// get couses stored in localstorage
		setCourses(handleGetLocalCourses());
	}, []);

	const handleAddCourses = useCallback(
		(size: string) => {
			setToggleAddCourses(false);

			// validate if size is a numeral
			if (!/^\d+$/.test(size)) {
				return setTimeout(
					() => setToggleAlert("Please enter a valid numeral."),
					100
				);
			}

			// generate courses inputs
			const newCourses: CourseData[] = [];
			for (let i = 0; i < parseInt(size); i++) {
				newCourses.push(["", 0, 40]);
			}

			// store courses
			const coursesToStore = (courses || []).concat(newCourses);
			window.localStorage.setItem("courses", JSON.stringify(coursesToStore));
			setCourses(coursesToStore);
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

	const handleCalculation = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			// clear calculated result display container
			setShowCalcResult(null);

			// val courses
			if (!courses || courses.length <= 0) {
				return setToggleAlert("Oops, please add course(s) to continue.");
			}

			// get result inputed result
			const resultData = resultInput.current?.value.trim() || "";

			// clean result data
			let cleanedResultData = resultData
				.split(/(\t|\n)/)
				.filter((e) => e !== "\t" && e !== "\n")
				.filter((e) => e.trim() !== "")
				.reduce((arr: string[], itm: string) => {
					itm = itm.trim();
					if (/^(\d{1,3}[A-F]+)$/i.test(itm)) {
						itm = itm.replace(/[A-F]/gi, "");
					}
					if (/^\d{1,3}$/.test(itm)) {
						arr.push(itm);
					} else if ("-" === itm) {
						arr.push("-");
					} else if (/^(NIL|AB)$/i.test(itm)) {
						arr.push("0");
					} else {
						arr.push(itm);
					}
					return arr;
				}, []);

			// remove result data headings
			const firstThreeColsCount = 3; // (S/N, Scholar's Name, and Matric No.)
			const lastFiveColsCount = 5; // (Total Units, Units Passed, Carry Over Units, GP, GPA)
			cleanedResultData.splice(
				0,
				firstThreeColsCount + courses.length + lastFiveColsCount
			);

			// remove result data units
			cleanedResultData.splice(0, courses.length);

			// tranform result data into array chunks and extract each row first three cols
			// each chunk represents each row of the result
			const resultDataFirstThreeCols: string[][] = [];
			const resultDataChunks: string[][] = arrayChunk(
				firstThreeColsCount + courses.length,
				cleanedResultData
			).map((row) => {
				resultDataFirstThreeCols.push(row.splice(0, firstThreeColsCount));
				return row;
			});

			// val if total number each resultDataChunks is equal to total number of courses
			if (
				resultDataChunks.length <= 0 ||
				resultDataChunks.some((row) => row.length !== courses.length)
			) {
				return setToggleAlert("Oops, invalid result data format.");
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
			resultContainer.current?.scrollIntoView({ block: "start" });
		},
		[courses]
	);

	return (
		<>
			<header>
				<div className="doc-width p-tb-10 p-lr-20 flex justify-content-between align-items-center">
					<h1>GPCALC</h1>
				</div>
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
							<li>Do not leave any column empty</li>
							<li>
								Use hyphen (-) in place of score for a course the student
								does/did not offer
							</li>
							<li>You can also use NIL in place of 0 (zero)</li>
							<li>Use AB (ie. absent) or 0 (zero) for an absentee</li>
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
					<form onSubmit={handleCalculation}>
						<div className="p-tb-10">
							<h3>Courses</h3>
							<div className="flex flex-wrap">
								{courses?.map((d, _i) => (
									<Course
										key={_i}
										data={d}
										index={_i}
										courseUpdate={handleCourseUpdate}
									/>
								))}
							</div>
						</div>
						<div className="selector m-t-20">
							<div className="selector-elems">
								<label htmlFor="scores">
									<h3>Scores</h3>
								</label>
								<textarea
									className="p-10 m-t-10"
									cols={30}
									rows={10}
									id="scores"
									placeholder="Paste result table here"
									ref={resultInput}
									required
								/>
								<div className="m-t-10">
									<label>
										<input
											type="checkbox"
											className="m-r-10"
											onChange={() => setIsComposite(true)}
											checked={isComposite}
											required
										/>
										<span>Result type is composite.</span>
									</label>
								</div>
								<div className="flex flex-wrap align-items-center m-t-20 --flex">
									<button type="submit" className="p-10 m-r-10">
										Calculate
									</button>
								</div>
							</div>
						</div>
					</form>
					<div className="flex justify-content-center">
						<div
							className="p-10 text-center --result-container"
							ref={resultContainer}
						>
							{showCalcResult ? (
								<>
									<div className="flex justify-content-end m-b-10">
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
								</>
							) : (
								"Calculated result will appear here..."
							)}
						</div>
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
					&copy;
					{" " + new Date().getFullYear() + " "}
					<a
						href="https://24cipher.com?ref=gpcalc"
						target="_blank"
						rel="noreferrer"
					>
						24Cipher Labs
					</a>
					{" Software License & Usage."}
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
		</>
	);
}
