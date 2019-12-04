import fs from 'fs';
// import day from './day1'

export function readInput(dayNumber: number) {
	let filename = getFileName(dayNumber)
	if (fs.existsSync(filename)) {
		return fs.readFileSync(`./inputs/day${dayNumber}.txt`).toString('utf8').split('\n');
	} else {
		return null
	}
}

export function getLatestDay() {
	function digitsOnly(str: string) {
		return str.replace(/[^\d]/g,'',)
	}
	let inputs = fs.readdirSync('./inputs')
	let numbers = inputs.map(digitsOnly).map(Number).sort()
	// console.log(numbers);
	return numbers.pop()
	// return 4
}

function getFileName(dayNumber: number): string {
	return `./inputs/day${dayNumber}.txt`
}

export async function runDay(dayNumber: number) {
	let fileContents = readInput(dayNumber)
	if (fileContents) {
		let module = await import(`./day${dayNumber}`)
		let day: AdventOfCodeDay<unknown, unknown> = new module.default

		let solve = day.part1.solve
		let generate = day.part1.generate
		let part1Answer = solve(generate(fileContents))

		solve = day.part2.solve
		generate = day.part2.generate
		let part2Answer = solve(generate(fileContents))
		console.log(`Day ${dayNumber}:\n\tPart 1: ${part1Answer}\n\tPart 2: ${part2Answer}`)
	}
}
