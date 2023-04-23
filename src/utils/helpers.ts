// function stick body

import { CourseData } from "../components/Course";

// use case is when dialogue is triggered
let top: undefined | number;
export function stickBody() {
	if (document.body.classList.contains("no-overflow")) {
		document.body.classList.remove("no-overflow");
		document.body.style.top = "";
		window.scroll(0, top ? top : 0);
		return;
	}
	top = window.scrollY;
	document.body.classList.add("no-overflow");
	document.body.style.top = "-" + top + "px";
}

// function chunk items of an array into sub array
export function arrayChunk(size: number, arr: any[]) {
	const chunk = [];
	for (let i = 0; i < arr.length; i += size) {
		chunk.push(arr.slice(i, i + size));
	}
	return chunk;
}

// function to calculate grade
export function calcGrade(
	score: string,
	unit: number,
	pass: number
): [string, number] {
	let matchScore = score.match(/(-|NIL|AB)/i);
	if (matchScore) {
		return [matchScore[0], 0];
	}
	const _score = parseInt(score);
	if (_score < 40 || _score < pass) {
		return [_score + "F", 0 * unit];
	}
	if (_score <= 44) {
		return [_score + "E", 1 * unit];
	}
	if (_score <= 49) {
		return [_score + "D", 2 * unit];
	}
	if (_score <= 59) {
		return [_score + "C", 3 * unit];
	}
	if (_score <= 69) {
		return [_score + "B", 4 * unit];
	}
	return [_score + "A", 5 * unit];
}

export function calculator(dataChunk: string[], courses: CourseData[]) {
	// get all units
	const units = courses.map((course, i) =>
		"-" !== dataChunk[i] ? course[1] : 0
	);

	// get all pass mark
	const passMarks = courses.map((course, i) =>
		"-" !== dataChunk[i] ? course[2] : 0
	);

	// get total grade
	const gradedScores: string[] = [];
	const totalGrade = dataChunk
		.map((score, i) => calcGrade(score, units[i], passMarks[i]))
		.reduce((total: number, item) => {
			gradedScores.push(item[0]);
			total += item[1];
			return total;
		}, 0);

	// calc total units
	const totalUnits = units.reduce((t, i) => {
		t += i;
		return t;
	}, 0);

	// calc failed units
	const failedUnits = units
		.filter(
			(unit, i) =>
				0 !== unit &&
				(/(NIL|AB)/i.test(dataChunk[i]) ||
					parseInt(dataChunk[i]) < passMarks[i])
		)
		.reduce((t, i) => {
			t += i;
			return t;
		}, 0);

	// calc gpa
	const GPA = Number(totalGrade / totalUnits).toFixed(2);

	return {
		gradedScores,
		calcScores: [
			totalUnits,
			totalUnits - failedUnits, // units passed
			failedUnits, // carry over units
			totalGrade, // gp
			GPA,
		].map((e) => e.toString()),
	};
}

// function to copy to clipboard
export function copier(
	node?: Node,
	successCallback?: Function,
	errorCallback?: Function
) {
	try {
		// val node exists
		if (!node) {
			return;
		}

		// set range
		const range = document.createRange();
		range.selectNodeContents(node);

		// range selection
		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);

		// exec copy
		if (document.execCommand("copy") && successCallback) {
			successCallback();
		}

		// remove selected ranges
		window.getSelection()?.removeAllRanges();
	} catch (err) {
		console.error(err);
		if (errorCallback) {
			errorCallback(err);
		}
	}
}
