import React, { Component } from 'react'
import q from './data/question_master.js'
import Board from './components/board'
import Scorecard from './components/scorecard'
import shuffleArray from "./helpers/arrayHelpers"
import StartMenu from './components/startmenu'
import RestartBtn from './components/restartbtn'
import "./components/app.css"


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            q: q, //questions,answers,and correct answer
            categories: [],
            cardflipped: false, //boolean to prevent multiple cardflips at 1 time
            team1: "Team 1",//team names
            team2: "Team 2",
            t1Score: 0, //team scores
            t2Score: 0,
            nofteams: 1,
            t1turn: true,
            questionsShuffled: false,
            counter: 0
        }
    }
    reset() {
        let newQuestions = this.state.q
        let categories = this.state.categories
        for(let i = 0; i < 5; i++){
            newQuestions[categories[i]].questions.splice(0,5)
        }
        console.log(newQuestions)
        document.querySelector('.score-div').classList.add('hide')
        document.querySelector('.restBtn').classList.add('hide')
        document.querySelector('.start-menu').classList.remove('hide')
        document.querySelectorAll('.flip-card-inner').forEach(item=>{
            item.style.removeProperty('transform')
            item.style.removeProperty('background-color')
        })
        document.querySelectorAll('.flip-card-back').forEach(item=>{
            item.style.removeProperty('display')
        })
        this.setState({
            q: newQuestions, 
            categories: [],
            cardflipped: false, 
            team1: 'Team 1',
            team2: 'Team 2',
            t1Score: 0, //team scores
            t2Score: 0,
            nofteams: 1,
            t1turn: true,
            questionsShuffled: false,
            counter: 0
        })
    }
    teamSet(e) {
        let teams = e.target.parentElement.querySelectorAll('input')
        teams.length > 1 ?
            this.setState({ team1: teams[0].value, team2: teams[1].value }) : this.setState({ team1: teams[0].value })
        document.querySelector('.board').classList.remove('hide')
        document.querySelector('.score-div').classList.remove('hide')
        e.target.parentElement.parentElement.parentElement.classList.add('hide')
        this.categories(this.state.q)
        this.state.categories.map((item, i) => {
            shuffleArray(this.state.q[item].questions)
        })
    }
    teamValueSet(e) {
        this.setState({ nofteams: parseInt(e.target.value) })
    }
    handleClick(e, correct) {//function to check for correct answer and clear out square
        let parent = e.target.parentElement.parentElement
        let total = parent.parentElement.firstChild.querySelector('span').textContent.toString()
        total = parseInt(total.slice(1))
        if (e.target.value === correct) {
            if (this.state.t1turn) {
                this.setState({ t1Score: this.state.t1Score + total })
            } else {
                this.setState({ t2Score: this.state.t2Score + total })
            }
        } else {
            if (this.state.nofteams === 2) {
                this.state.t1turn = !this.state.t1turn
            }
        }
        this.state.counter++
        parent.style.display = 'none'
        parent.parentElement.style['background-color'] = '#3333ff'
        parent.parentElement.style.transform = 'rotateY(180deg)'
        parent.parentElement.parentElement.style.transform=""
        parent.parentElement.parentElement.classList.remove('mainQuestion')
        this.state.cardflipped = false
        if (this.state.counter === 25) {
            document.querySelector('.board').classList.add('hide')
            document.querySelector('.restBtn').classList.remove('hide')
        }
    }
    cardflip(id) { //function to apply CSS to cause flip animation on cards
        let card = document.getElementById(id)
        let board = document.querySelector('.board')
        let boardCorner = board.getBoundingClientRect()
        let cardCorner = card.getBoundingClientRect()
        let x = boardCorner.x-cardCorner.x
        let y = boardCorner.y-cardCorner.y
        if (!this.state.cardflipped) {
            card.parentElement.style.transform = `rotateY(180deg)`
            card.parentElement.parentElement.classList.add('mainQuestion')
            card.parentElement.parentElement.style.transform = `translate(${x}px, ${y}px)  scale(5)`
            this.state.cardflipped = true
            
        }
    }
    categories(q) {
        let keys = Object.keys(q)
        this.state.categories = shuffleArray(keys)
    }
    render() {
        return (<div>
            <StartMenu nofteams={this.state.nofteams} teamValueSet={(e) => { this.teamValueSet(e) }} teamSet={(e) => { this.teamSet(e) }} />

            <Scorecard team1={this.state.team1} team2={this.state.team2} t1score={this.state.t1Score} t2score={this.state.t2Score} teams={this.state.nofteams} />

            <Board questions={this.state.q} handleClick={(e, correct, counter) => { this.handleClick(e, correct, counter) }}
                cardflip={(id) => { this.cardflip(id) }} categories={this.state.categories} />
            <RestartBtn reset={()=>{this.reset()}} winner={this.state.nofteams===1?null:this.state.t1Score>this.state.t2Score?this.state.team1:this.state.team2}/>
        </div>)
    }
}

export default Game
