import { readInput, runDay, getLatestDay } from './util'

function main() {
	let runDayNumber = process.argv[2]
	if (runDayNumber === "latest") {
		let lastDay = getLatestDay()
		if (lastDay !== undefined) {
			runDay(lastDay)
		} else {
			console.log('No latest day, do you have inputs? Alternatively, run with "all" or a specific number as the first argument.')
		}
	} else if ( typeof runDayNumber === "number" ) {
		runDay(Number(runDayNumber))
	} else {
		for (const x of Array(25).keys()) {
			let dayNumber = x + 1
			runDay(dayNumber)
		}
	}
}

main()
