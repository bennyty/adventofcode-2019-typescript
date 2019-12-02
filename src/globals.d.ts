interface generator<T> {
	generate(input: string[]): T
}

interface solver<T> {
	solve(input: T): string
}

interface AdventOfCodeDayPart<T> extends generator<T>, solver<T> { }

interface AdventOfCodeDay<T,T2> {
	part1: AdventOfCodeDayPart<T>
	part2: AdventOfCodeDayPart<T2>
}
