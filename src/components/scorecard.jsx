import React from 'react'
import "./scorecard.css"
//creates scorecard for both teams scores
const Scorecard = (props) => {
    const numberOfTeams = (n) => {
        if(n===2) {
            return <div>{`${props.team2}: ${props.t2score}`}</div>    
        }
    }
    return (
        <div className='score-div hide'>
            <div><h4>Score</h4></div>
            <div>{`${props.team1}: ${props.t1score}`}</div>
            {numberOfTeams(props.teams)}
        </div>
    )
}

export default Scorecard