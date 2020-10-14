import React from 'react'

export default class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            colId: props.colId,
            rowId: props.rowId
        }
    }
    render() {
        return (
            <td id={this.state.rowId + ' ' + this.state.colId} className='cell'>
                <span>{this.state.value === 0 ? null : this.state.value}</span>
            </td>
        )
    }
}