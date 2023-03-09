import { useEffect, useState } from "react";

export type CourseData = [code: string, unit: number, pass: number];

export interface CourseProps {
	data: CourseData;
	index: number;
	courseUpdate: Function;
}

export default function Course({ data, index, courseUpdate }: CourseProps) {
	const [code, setCode] = useState(data[0]);
	const [unit, setUnit] = useState(data[1]);
	const [pass, setPass] = useState(data[2]);

	useEffect(() => {
		const newData: CourseData = [code, unit, pass];
		courseUpdate(index, newData);
	}, [code, unit, pass, courseUpdate, index]);

	return (
		<div className="course">
			<input
				type="text"
				onBlur={(e) => setCode(e.currentTarget.value.trim().toUpperCase())}
				defaultValue={code}
				placeholder="course"
				required
			/>
			<input
				type="number"
				onBlur={(e) => {
					const value = e.currentTarget.value.trim();
					setUnit(value === "" ? 0 : parseInt(value));
				}}
				defaultValue={unit === 0 ? "" : unit}
				placeholder="unit"
				pattern="[1-9]{1,2}"
				title="Only one or two digit(s) are allowed"
				required
			/>
			<input
				type="number"
				onBlur={(e) => {
					const value = e.currentTarget.value.trim();
					setPass(value === "" ? 0 : parseInt(value));
				}}
				defaultValue={pass === 0 ? "" : pass}
				placeholder="pass"
				pattern="[0-9]{2}"
				title="Only two digits are allowed"
				required
			/>
		</div>
	);
}
