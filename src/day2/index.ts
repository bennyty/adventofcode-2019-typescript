
/* Day 2
Fuel required to launch a given module is based on its mass. Specifically, to
find the fuel required for a module, take its mass, divide by three, round
down, and subtract 2.

The Fuel Counter-Upper needs to know the total fuel requirement. To find it,
individually calculate the fuel needed for the mass of each module (your
puzzle input), then add together all the fuel values.
*/

function randomIntFromInterval(min: number, max: number) { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

type p1 = number[]
type p2 = number[]

type machine = { ip: number, tape: number[] }
enum OPCODE {
	ADD = 1,
	MUL = 2,
	HALT = 99
}

function tick(machine: machine): void | null {
	let currentInstruction = machine.tape[machine.ip]
	switch (currentInstruction) {
		case OPCODE.ADD: {
			let arg1 = machine.tape[machine.ip + 1]
			let arg2 = machine.tape[machine.ip + 2]
			let arg3 = machine.tape[machine.ip + 3]
			// console.log("ADD", arg1, arg2, arg3);
			machine.tape[arg3] = machine.tape[arg1] + machine.tape[arg2]
			machine.ip += 4
		} break
		case OPCODE.MUL: {
			let arg1 = machine.tape[machine.ip + 1]
			let arg2 = machine.tape[machine.ip + 2]
			let arg3 = machine.tape[machine.ip + 3]
			// console.log("MUL", arg1, arg2, arg3);
			machine.tape[arg3] = machine.tape[arg1] * machine.tape[arg2]
			machine.ip += 4
		} break
		default:
			return null
	}
}

export default abstract class Day2<T, T2> implements AdventOfCodeDay<p1, p2> {
	part1 = {
		generate(input: string[]): p1 {
			function parseLine(line: string): number[] {
				return line.split(',').map(Number)
			}
			let tape = input.flatMap(parseLine)
			// restore the gravity assist program to the "1202 program alarm" state it had just before the last computer caught fire.
			tape[1] = 12
			tape[2] = 2
			return tape
		},
		solve(input: p1): string {
			let m: machine = { ip: 0, tape: Array.from(input) }
			while (m.tape[m.ip] !== OPCODE.HALT) {
				tick(m)
			}
			return String(m.tape[0])
		}
	}

	part2 = {
		generate: this.part1.generate,
		solve(input: p2): string {
			let m: machine
			let gravAssistAnswer = 19690720
			let noun
			let verb

			do {
				m = { ip: 0, tape: Array.from(input) }
				noun = m.tape[1] = randomIntFromInterval(0,1000)
				verb = m.tape[2] = randomIntFromInterval(0,1000)

				while (m.tape[m.ip] !== OPCODE.HALT) {
					if (tick(m) === null) { break }
				}
			} while (m.tape[0] !== gravAssistAnswer);
			return `${100 * noun + verb} = 100 * noun:(${noun}) + verb(${verb})`
		}
	}

}
