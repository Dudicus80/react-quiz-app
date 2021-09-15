import React from 'react'
import "./restartbtn.css"

const RestartBtn = (props) => {
    return (
        <div className="restBtn hide">
            <h1>Game Over</h1>
            <h2>The winner is: {props.winner}</h2>
            <button onClick={() => { props.reset() }}>Reset</button>
        </div>
    )
}

export default RestartBtn