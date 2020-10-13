import React from 'react'
import Cell from './Cell'

export default class Board extends React.Component{
    constructor() {
        super()
        this.state = {
            board: []
        }
    }
    makeBoard() {
        const board = []
        for (let i = 0; i < 10; i++) {
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
                {arr.map((row) => this.makeRow(row))}
            </tbody>
        </table>
        return table
    }
    makeRow(r){
        const rw = 
        <tr>
            {r.map((c) => this.makeCell(c))}
        </tr>
        return rw
    }
    makeCell(c) {
        const cell = <Cell value={c} />
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