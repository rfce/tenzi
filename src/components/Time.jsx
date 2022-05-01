// Returns time (seconds) in mm:ss format
const Time = ({ time }) => {
    const minute = ("0" + Math.floor(time / 60)).slice(-2)
    const second = ("0" + time % 60).slice(-2)

    return `${ minute }:${ second }`
}

export default Time
