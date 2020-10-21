import React from 'react'
import Cell from './Cell'
import '../src/Board.css'
// const GameGenerator = require('./GameGenMethods')
import GameGenerator from './GameGenMethods'
const gameCreator = new GameGenerator()
const SudokuValidator = require('./SudokuValidator')

export default class Board extends React.Component{
    constructor() {
        super()
        this.state = {
            board: [],
            clicked: 0,
            displayBoard: [],
            currentDifficulty: 'medium',
            complete: false,
            won: false
        }
        this.changeCellValue = this.changeCellValue.bind(this)
    }

    makeNewGame(difficulty) {
        let newGame = null
        if (difficulty === 'easy') newGame = gameCreator.createEasy()
        if (difficulty === 'medium') newGame = gameCreator.createMedium()
        if (difficulty === 'hard') newGame = gameCreator.createHard()
        if (difficulty === 'expert') newGame = gameCreator.createExpert()
        this.setState({
            board: newGame,
            displayBoard: this.makeTable(newGame),
            currentDifficulty: difficulty,
            complete: false,
            won: false
        })

    }
    makeDefaultBoard() {
        const board = gameCreator.createMedium()
        // const board = gameCreator.createTest()
        this.setState({
            board: board,
            displayBoard: this.makeTable(board)
        })
    }
    makeTable(arr) {
        const table = 
        <table>
            <tbody>
                {arr.map((row, i) => this.makeRow(row, i))}
            </tbody>
        </table>
        return table
    }
    makeRow(r, i){
        const rowId = i
        const rw = 
        <tr key={i} id={i}>
            {r.map((val, i) => this.makeCell(val, i, rowId))}
        </tr>
        return rw
    }
    makeCell(val, i, rowId) {
        const cell = <Cell key={i} value={val} colId={i} rowId={rowId} method={this.changeCellValue}/>
        return cell
    }
    setValue(num) {
        this.setState({
            clicked: num
        })
    }
    checkWin(board) {
        const full = SudokuValidator.isFull(board)
        const valid = SudokuValidator.isValid(board)
        this.setState({
            complete: full,
            won: valid
        })
    }
    changeCellValue(r, c) {
        const newBoard = this.state.board
        newBoard[r][c] = this.state.clicked
        this.setState({
            board: newBoard,
            displayBoard: this.makeTable(newBoard)
        })
        this.checkWin(newBoard)
    }

    componentDidMount() {
        this.makeDefaultBoard()
    }

    render() {
        const  { clicked, currentDifficulty, complete, won } = this.state
        return (
            <div id='main-div'>
                <div id='header-div'>
                    <h1 id='header'>Sudoku</h1>
                    <h4 id='header-blurb'>the samurai of puzzles</h4>
                </div>
                <div id='difficulty-selection'>
                    <button 
                        onClick={()=> this.makeNewGame('easy')}
                        className={currentDifficulty === 'easy' ? 'clicked-difficulty-selection' : null}>Easy
                    </button>
                    <button 
                        onClick={()=> this.makeNewGame('medium')}
                        className={currentDifficulty === 'medium' ? 'clicked-difficulty-selection' : null}>Medium
                    </button>
                    <button 
                        onClick={()=> this.makeNewGame('hard')}
                        className={currentDifficulty === 'hard' ? 'clicked-difficulty-selection' : null}>Hard
                    </button>
                    <button 
                        onClick={()=> this.makeNewGame('expert')}
                        className={currentDifficulty === 'expert' ? 'clicked-difficulty-selection' : null}>Expert
                    </button>
                </div>
                {this.state.displayBoard}
                <div id='number-selection-div'>
                    <span id='1' 
                          className={clicked === 1 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(1)}>1
                    </span>
                    <span id='2' 
                          className={clicked === 2 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(2)}>2
                    </span>
                    <span id='3' 
                          className={clicked === 3 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(3)}>3
                    </span>
                    <span id='4' 
                          className={clicked === 4 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(4)}>4
                    </span>
                    <span id='5' 
                          className={clicked === 5 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(5)}>5
                    </span>
                    <span id='6' 
                          className={clicked === 6 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(6)}>6
                    </span>
                    <span id='7' 
                          className={clicked === 7 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(7)}>7
                    </span>
                    <span id='8' 
                          className={clicked === 8 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(8)}>8
                    </span>
                    <span id='9' 
                          className={clicked === 9 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(9)}>9
                    </span>
                    <span id='X' 
                          className={clicked === null ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(null)}>X
                    </span>
                </div>
                <div id='win-status'>
                    {complete && won ? 
                    <div id='win-status-valid'>
                        <h2>You win!</h2>
                        <p>You may start a new game, or screenshot to flex on instagram.</p>
                    </div> 
                    : null}
                    {complete && !won ? 
                    <div id='win-status-invalid'>
                        <h2>Not a valid solution.</h2>
                        <p>Keep trying, or start a new game.</p>
                    </div>
                    : null}
                </div>
            </div>
        )
    }
}
