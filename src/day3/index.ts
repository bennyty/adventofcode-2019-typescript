
type movement = [dir, number]
type line = movement[]
type Point = [number, number]
type p1 = line[]
type p2 = line[]

enum dir {
	R = "R",
	D = "D",
	U = "U",
	L = "L",
}

// Plan draw both wires by stepping and marking. If, on the second wire, an intersection is found, check it's distance to (0,0) and replace if closest
function manhattanDistance(p1: Point, p2: Point): number {
	return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1]-p1[1]);
}

export default abstract class Day3<T, T2> implements AdventOfCodeDay<p1, p2> {
	part1 = {
		generate(input: string[]): p1 {
			// input = ["R8,U5,L5,D3", "U7,R6,D4,L4"]
			// input = ["R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"]
			// input = ["R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83"]
			function parseMovement(movement: string): movement {
				let letter = movement.substring(0, 1)
				let d: dir
				switch (letter) {
					case dir.R:
						d = dir.R
						break
					case dir.L:
						d = dir.L
						break
					case dir.U:
						d = dir.U
						break
					case dir.D:
						d = dir.D
						break
					default:
						throw new Error
				}
				let number = Number(movement.substring(1))
				return [d, number]
			}
			let movements = input.filter(line => line.length > 0).map(line => line.split(',').map(parseMovement))

			return movements
		},
		solve(input: p1): string {
			let page: Map<string, string> = new Map()
			let line1 = input[0]
			let line2 = input[1]
			let minDistanceToOrigin: number = Number.MAX_VALUE

			function setPoint(coordinate: Point, lineChar: string): boolean {
				let collision = page.has(coordinate.toString())
					&& page.get(coordinate.toString()) !== lineChar // No self-collision.

				page.set(coordinate.toString(), collision ? "X" : lineChar)
				return collision
			}

			function stepCursor(cursor: Point, direction: dir) {
				let newCursor: Point = [cursor[0], cursor[1]]
				switch (direction) {
					case dir.R:
						newCursor[0]++
						return newCursor
					case dir.L:
						newCursor[0]--
						return newCursor
					case dir.U:
						newCursor[1]++
						return newCursor
					case dir.D:
						newCursor[1]--
						return newCursor
				}
			}

			function drawLine(line: line, lineChar: string) {
				let cursor: Point = [0, 0]
				for (let movement of line) {
					let dir = movement[0]
					let amount = movement[1]
					for (let i = 0; i < amount; i++) {
						cursor = stepCursor(cursor, dir)
						if (setPoint(cursor, lineChar)) {
							// There was a "collision"
							minDistanceToOrigin = Math.min(minDistanceToOrigin, manhattanDistance([0,0], cursor))
						}
					}
				}
			}
			drawLine(line1, "-")
			drawLine(line2, "|")

			return String(minDistanceToOrigin)
		}
	}

	part2 = {
		generate(input: string[]): p2 {
			// input = ["R8,U5,L5,D3", "U7,R6,D4,L4"] // 30
			// input = ["R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83"] // 610
			// input = ["R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"] // 410
			function parseMovement(movement: string): movement {
				let letter = movement.substring(0, 1)
				let d: dir
				switch (letter) {
					case dir.R:
						d = dir.R
						break
					case dir.L:
						d = dir.L
						break
					case dir.U:
						d = dir.U
						break
					case dir.D:
						d = dir.D
						break
					default:
						throw new Error
				}
				let number = Number(movement.substring(1))
				return [d, number]
			}
			let movements = input.filter(line => line.length > 0).map(line => line.split(',').map(parseMovement))

			return movements
		},
		solve(input: p2): string {
			//                  lineName , steps to reach
			let page: Map<string, [string, number]> = new Map()
			let line1 = input[0]
			let line2 = input[1]
			let minCombinedPath: number = Number.MAX_VALUE

			function setPoint(coordinate: Point, lineChar: string, distance: number): boolean {
				let collision = page.has(coordinate.toString())
					&& page.get(coordinate.toString())![0] !== lineChar // No self-collision.

				let lineName  = collision ? "X" : lineChar
				let lineDistance  = collision ? page.get(coordinate.toString())![1] : distance
				page.set(coordinate.toString(), [lineName, lineDistance])
				return collision
			}

			function stepCursor(cursor: Point, direction: dir) {
				let newCursor: Point = [cursor[0], cursor[1]]
				switch (direction) {
					case dir.R:
						newCursor[0]++
						return newCursor
					case dir.L:
						newCursor[0]--
						return newCursor
					case dir.U:
						newCursor[1]++
						return newCursor
					case dir.D:
						newCursor[1]--
						return newCursor
				}
			}

			function drawLine(line: line, lineChar: string) {
				let cursor: Point = [0, 0]
				let totalMovement = 0
				for (let movement of line) {
					let dir = movement[0]
					let amount = movement[1]
					for (let i = 0; i < amount; i++) {
						cursor = stepCursor(cursor, dir)
						totalMovement++
						if (setPoint(cursor, lineChar, totalMovement)) {
							// There was a "collision"
							minCombinedPath = Math.min(minCombinedPath, totalMovement + page.get(cursor.toString())![1])
						}
					}
				}
			}
			drawLine(line1, "-")
			drawLine(line2, "|")

			return String(minCombinedPath)
		}
	}

}
