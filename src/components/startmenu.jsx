import React from 'react'
import TeamNames from './teamnames'
import "./startmenu.css"

const StartMenu = (props) => {
    let teams = 1
    
    const teamNames = (teams) => {
        return <TeamNames nofteams={teams} teamSet={(e)=>props.teamSet(e)}/>
    }
    return (
        <div className="start-menu">
            <div className="logo">

            </div>
            <div className="team-number">
                <p>How many teams are playing?</p>
                <button className="team-btn" value="1" onClick={(e)=>props.teamValueSet(e)} >One</button>
                <button className="team-btn" value="2" onClick={(e)=>props.teamValueSet(e)}>Two</button>
            </div>
            <div className="team-names">
                {teamNames(props.nofteams)}
            </div>
        </div>
    )
}

export default StartMenu