import React from 'react'
import Card from './card'
import "./board.css"
import shuffleArray from "../helpers/arrayHelpers"
//creates board that contains the 25 cards and category headings. 
const Board = ({ questions, handleClick, cardflip, categories }) => {
    const renderCard = (question, amount, handleClick, cardflip, i, key) => { //function to render the card on the board
        return <Card question={question} amount={amount} handleClick={handleClick} cardflip={cardflip} id={i} key={key} />
    }
    let newCategories = categories.filter(obj => {
        if (questions[obj].questions.length >= 5) {
            return obj
        }
    })
    // if (newCategories.length >= 5) {
    //     return (
    //         <div className="board hide">
    //             <div className="outOfQuestions">You have ran out of questions. Look at you go you little quiz dog you! Amazing!</div>
    //         </div>
    //     )
    // } else {
        return (
            <div className="board hide">
                {
                    newCategories.map((item, i) => {//map through 5 categories
                        if (i < 5) {
                            return (//display all 5 categories on screen 
                                <div className="category" key={`board${i}`}>
                                    <div className="title"><span>{questions[item].title}</span></div>
                                    {
                                        questions[item].questions.map((card, j) => {//randomize question placement in the categories
                                            if (j < 5) {
                                                let amount = `$${j + 1}00`
                                                let index = `board${i}card${j}`
                                                return renderCard(card, amount, handleClick, cardflip, index, j)
                                            }
                                        })
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    // }
}

export default Board