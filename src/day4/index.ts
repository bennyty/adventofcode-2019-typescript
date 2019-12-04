
type p1 = { lower: number, upper: number }
type p2 = { lower: number, upper: number }

export default abstract class Day4<T, T2> implements AdventOfCodeDay<p1, p2> {
	part1 = {
		generate(input: string[]): p1 {
			let range = input.filter(x => x.length !== 0).map(x => x.split('-').map(Number)).flat(1)
			return { lower: range[0], upper: range[1] }
		},
		solve(input: p1): string {
			function rule1(i: number) {
				return i.toString().length === 6
			}
			// Only going to check inside range, so unneeded
			// function rule2(i:number) {
			// }
			function rule3(i: number) {
				let pairs = i.toString().split('').map(Number).reduce(function (result: number[][], value, index, array) {
					// if (index % 2 === 0) // Need overlapping pairs so remove this
					result.push(array.slice(index, index + 2));
					return result;
				}, []);

				let samePairs = pairs.filter(x => x[0] === x[1])
				return samePairs.length >= 1
			}
			function rule4(i: number) {
				let prev = { val: 0, satisfied: true }
				i.toString().split('').map(Number).forEach(function (curr) {
					let satisfies = prev.val <= curr
					prev = { val: curr, satisfied: satisfies && prev.satisfied }
				})
				return prev.satisfied
			}

			let matching: number[] = []
			for (let i = input.lower; i < input.upper; i++) {
				if (rule1(i) && rule3(i) && rule4(i)) {
					matching.push(i)
				}
			}

			// return `${matching.length}: ${matching}`
			return String(matching.length)
		}
	}

	part2 = {
		generate(input: string[]): p2 {
			let range = input.filter(x => x.length !== 0).map(x => x.split('-').map(Number)).flat(1)
			return { lower: range[0], upper: range[1] }
		},
		solve(input: p2): string {
			function rule1(i: number) {
				return i.toString().length === 6
			}
			function rule3(i: number) {
				let prevNumber: number | undefined = undefined
				let groups: number[][] = []
				let group: number[] = []
				i.toString().split('').map(Number)
					.forEach(function (i) {
						if (i !== prevNumber) {
							prevNumber = i
							groups.push(group)
							group = []
							group.push(i)
						} else {
							group.push(i)
						}
					});

				groups.push(group)
				let oneLength2Group = groups.filter(x => x.length === 2)
				// if (oneLength2Group.length >= 1) {
				// 	console.log(i, groups)
				// }
				return oneLength2Group.length >= 1
			}
			function rule4(i: number) {
				let prev = { val: 0, satisfied: true }
				i.toString().split('').map(Number).forEach(function (curr) {
					let satisfies = prev.val <= curr
					prev = { val: curr, satisfied: satisfies && prev.satisfied }
				})
				return prev.satisfied
			}

			let matching: number[] = []
			for (let i = input.lower; i < input.upper; i++) {
				if (rule1(i) && rule3(i) && rule4(i)) {
					matching.push(i)
				}
			}

			// return `${matching.length}: ${matching}`
			return String(matching.length)
		}
	}


}
