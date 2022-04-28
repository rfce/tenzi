import { useState, useEffect } from "react"
import Die from "./Die"
import Realistic from "./Confetti"

const Board = () => {
	const [dice, setDice] = useState(() => generate_dice())
	const [win, setWin] = useState(false)

	useEffect(() => {
		// Value of first die
		const first = dice[0].value
		// Each die is held and value is same
		dice.every(die => die.hold && die.value == first) && setWin(true)
	}, [dice])

	function generate_dice() {
		const list = []

		for (let i = 0; i < 10; i++) {
			list.push({
				id: i,
				value: Math.ceil(Math.random() * 6),
				hold: false
			})
		}

		return list
	}

	const hold_die = (index) => {
		setDice(prev => prev.map(
			die => die.id == index ? { ...die, hold: !die.hold } : die
		))
	}

	const roll = () => {
		setDice(prev => prev.map(
			die => die.hold ? die : { ...die, value: Math.ceil(Math.random() * 6) }
		))
	}

	const reset = () => {
		setWin(false)
		setDice(generate_dice())
	}

	return (
		<>
			<Realistic win={win} />
			<h3 style={{ display: win ? 'block' : 'none' }}>You won</h3>
			<div className="board">
				{ dice.map(die => 
					<Die 
						key={die.id} 
						die={die} 
						hold={() => hold_die(die.id)} 
						win={win} 
					/>)
				}
			</div>
			<button
				className={win ? 'reset-btn' : undefined}
				onClick={() => win ? reset() : roll()}>{win ? "Reset" : "Roll"}
			</button>
		</>
	)
}

export default Board
