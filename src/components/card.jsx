import React from 'react'
import Answer from './answer'
import "./card.css"

const Card = ({ question, amount = "$100", handleClick, cardflip, id}) => {//create the card that contains the question and answer. Card will flip when clicked. Props passed are question, handleClick, cardflip, and id
    const renderAnswer = (i) => {//function to render the four answer choices. 
        return <Answer answer={question.answers[i]} handleClick={(e, correct=question.correct) => { handleClick(e, correct) }} key={`answer${i}`}/>//answer is the possible answer, handclick function will process the answer to determine if it is correct or not. 
    }
    const renderQuestion = () => {//function to render the question itself to be placed on the card. 
        return (
            <div className="flip-card-back">
                <div className="question-div">{question.question}</div>
                {question.answers.map((item, i) => {
                    return renderAnswer(i)
                })}
            </div>
        )
    }

    return ( //return statement to create card containing the question and answers.
        <div className="flip-card transformBase" >
            <div className="flip-card-inner">
                <div className="flip-card-front" id={`${id}`} onClick={()=>cardflip(id)}>
                    <div className="amount-div no-click"><span className="no-click">{amount}</span></div>
                </div>

                {renderQuestion()}

            </div>
        </div>
    )

}

export default Card