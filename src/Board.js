import React from 'react'
import Cell from './Cell'
import '../src/Board.css'

export default class Board extends React.Component{
    constructor() {
        super()
        this.state = {
            board: []
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
        const rw = 
        <tr key={i}>
            {r.map((c, i) => this.makeCell(c, i))}
        </tr>
        return rw
    }
    makeCell(c, i) {
        const cell = <Cell key={i} value={c} />
        return cell
    }
    componentDidMount() {
        this.makeBoard()
    }
    render() {
        return (
            <div>
                {this.makeTable(this.state.board)}
            </div>
        )
    }
}