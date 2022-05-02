import { useState, useEffect } from "react"
import Die from "./Die"
import Realistic from "./Confetti"
import HighScore from "./HighScore"
import Timer from "./Timer"

const Board = () => {
	const [dice, setDice] = useState(() => generate_dice())

	// Game state - idle, running, win, lose
	const [running, setRunning] = useState('idle')
	const [time, setTime] = useState(0)

	// Get highscore from local storage
	const [best, setBest] = useState(
		() => Number(localStorage.getItem('highscore'))
	)

	// Determine winner
	useEffect(() => {
		const first = dice[0].value

		// Each die is held and value is same
		if (dice.every(die => die.hold && die.value == first)) {
			// First game or finished in less time -> win
			if (time < best || best == 0) {
				setBest(time)
				setRunning('win')
			} else {
				setRunning('lose')
			}
		}
	}, [dice])

	// Timer
	useEffect(() => {
		let timer

		// Start timer if game is running else remove timer
		if (running == 'running') {
			timer = setInterval(() => {
				setTime(prev => prev + 1)
			}, 1000)
		} else {
			clearInterval(timer)
		}

		return () => clearInterval(timer)
	}, [running])

	// Save high score to local storage
	useEffect(() => {
		localStorage.setItem("highscore", best)
	}, [best])

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

	// Sets clicked die on hold
	const hold_die = (index) => {
		// Starts the timer when first die is clicked
		if (running == 'idle') { setRunning('running') }

		setDice(prev => prev.map(
			die => die.id == index ? { ...die, hold: !die.hold } : die
		))
	}

	// Generates new values for dice that aren't held
	const roll = () => {
		if (running == 'idle') { setRunning('running') }

		setDice(prev => prev.map(
			die => die.hold ? die : { ...die, value: Math.ceil(Math.random() * 6) }
		))
	}

	const reset = () => {
		setRunning('idle')
		setDice(generate_dice())
		setTime(0)
	}

	const game_over = running == 'win' || running == 'lose'

	return (
		<>
			<Realistic pop={running == 'win'} />
			{ running == 'win' && <HighScore time={best} /> }
			<Timer 
				current_time={time} 
				best_time={best} 
				running={running} 
			/>
			<div className="board">
				{ dice.map(die => 
					<Die 
						key={die.id} 
						die={die} 
						hold={() => hold_die(die.id)} 
						win={game_over} 
					/>)
				}
			</div>
			<button
				className={game_over ? 'reset-btn' : undefined}
				onClick={() => game_over ? reset() : roll()}>{game_over ? "Reset" : "Roll"}
			</button>
		</>
	)
}

export default Board
