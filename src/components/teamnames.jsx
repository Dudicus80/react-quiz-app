import React from 'react'

const TeamNames = (props) => {
    let teams
    if(props.nofteams === 1) {
        teams = ['team1']
    } else if (props.nofteams === 2) {
        teams = ['team1', 'team2']
    }

    return (
        <div>
            {teams.map((item,i) => {
               return ( <div key={item}>
                <label>Team {i+1} Name</label>
                <input type='text' required placeholder={`Team ${i+1} name`} name={item} />
                </div>)
            })}
            <button onClick={props.teamSet}>Start</button>
        </div>
    )
}

export default TeamNames