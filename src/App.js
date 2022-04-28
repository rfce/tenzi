import Board from './components/Board'
import './App.css'

function App() {
	return (
		<div className='container'>
			<header>
				<h2>Tenzies</h2>
				<p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			</header>
			<Board />
		</div>
	)
}

export default App
