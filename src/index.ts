import { readInput, runDay } from './util'

function main() {
	let runDayNumber = process.argv[2]
	if ( runDayNumber ) {
		runDay(Number(runDayNumber))
	} else {
		for (const x of Array(25).keys()) {
			let dayNumber = x + 1
			runDay(dayNumber)
		}
	}
}

main()
