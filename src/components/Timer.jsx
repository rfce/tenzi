import Time from './Time'

const Timer = ({ current_time, best_time, running }) => {
    const highlighter = () => {
		if (running != 'running') { return "elapsed-time" }

		if (best_time) {
			if (current_time < best_time) { return "elapsed-time safe" }

			return "elapsed-time warning"
		}
		return "elapsed-time safe"
	}

    return (
        <div className="timer">
            <div className={ highlighter() }>
                <Time time={current_time} />
            </div>
            <div className="best-score">
                Your best time: <span><Time time={best_time} /></span>
            </div>
        </div>
    )
}

export default Timer
