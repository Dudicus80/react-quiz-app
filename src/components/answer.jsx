import React from 'react'
import './answer.css'

const Answer = ({answer, handleClick}) => { //display answer. 
    return (<div className="individualAnswerDiv">
        <button value={answer} onClick={ handleClick }>
            {answer}
        </button>
    </div>  )
}

export default Answer