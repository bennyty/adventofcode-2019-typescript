
/* Day 1
Fuel required to launch a given module is based on its mass. Specifically, to
find the fuel required for a module, take its mass, divide by three, round
down, and subtract 2.

The Fuel Counter-Upper needs to know the total fuel requirement. To find it,
individually calculate the fuel needed for the mass of each module (your
puzzle input), then add together all the fuel values.
*/

type p1 = number[]
type p2 = number[]

export default abstract class Day1<T, T2> implements AdventOfCodeDay<p1, p2> {
	part1 = {
		generate(input: string[]): p1 {
			return input.map(Number)
		},
		solve(input: p1): string {
			function fuelForModule(mass: number) {
				return Math.max(0, Math.floor(mass / 3) - 2)
			}
			return String(
				input.map(fuelForModule)
					.reduce((x, y) => x + y)
			)
		}
	}

	part2 = {
		generate: this.part1.generate,
		solve(input: p2): string {
			function fuelForMass(mass: number): number {
				return Math.max(0, Math.floor(mass / 3) - 2)
			}
			function fuelForModule(mass: number): number {
				let fuel = fuelForMass(mass)
				if (fuel === 0) { return 0 }
				return fuel + fuelForModule(fuel)
			}

			return String(
				input.map(fuelForModule)
					.reduce((x, y) => x + y)
			)
		}
	}

}
