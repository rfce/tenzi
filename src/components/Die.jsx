const Die = ({ die, hold, win }) => {
    let style = "die-win"

    if (win === false) {
        style = die.hold ? "die-hold" : undefined
    }

    return (
        <div className={style} onClick={win ? undefined : hold}>
            { die.value }
        </div>
    )
}

export default Die
