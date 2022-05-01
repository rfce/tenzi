import Time from "./Time"

const HighScore = ({ time }) => (
    <div className="gradient-border">
        <h3>
            <p>New High Score</p>
            <Time time={time} />
        </h3>
    </div>
)

export default HighScore
