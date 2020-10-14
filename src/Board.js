import React from 'react'
import Cell from './Cell'
import '../src/Board.css'

export default class Board extends React.Component{
    constructor() {
        super()
        this.state = {
            board: [],
            clicked: 0
        }
    }
    makeBoard() {
        const board = []
        for (let i = 0; i < 9; i++) {
            board.push(Array(9).fill(0))
        }
        this.setState({
            board: board
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
            {r.map((c, i) => this.makeCell(c, i, rowId))}
        </tr>
        return rw
    }
    makeCell(c, i, rowId) {
        const cell = <Cell key={i} value={c} colId={i} rowId={rowId}/>
        return cell
    }
    setValue(num) {
        this.setState({
            clicked: num
        })
    }
    changeCellValue() {

    }
    componentDidMount() {
        this.makeBoard()
    }
    render() {
        return (
            <div id='main-div'>
                <div id='header-div'>
                    <h1 id='header'>Sudoku</h1>
                    <h4 id='header-blurb'>the samurai of puzzles</h4>
                </div>
                {this.makeTable(this.state.board)}
                <div id='number-selection-div'>
                    <span id='1' 
                          className={this.state.clicked === 1 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(1)}>1</span>
                    <span id='2' 
                          className={this.state.clicked === 2 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(2)}>2</span>
                    <span id='3' 
                          className={this.state.clicked === 3 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(3)}>3</span>
                    <span id='4' 
                          className={this.state.clicked === 4 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(4)}>4</span>
                    <span id='5' 
                          className={this.state.clicked === 5 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(5)}>5</span>
                    <span id='6' 
                          className={this.state.clicked === 6 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(6)}>6</span>
                    <span id='7' 
                          className={this.state.clicked === 7 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(7)}>7</span>
                    <span id='8' 
                          className={this.state.clicked === 8 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(8)}>8</span>
                    <span id='9' 
                          className={this.state.clicked === 9 ? 'clicked number-selection' : 'number-selection'} 
                          onClick={()=> this.setValue(9)}>9</span>
                </div>
            </div>
        )
    }
}
