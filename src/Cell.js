import React from 'react'

export default class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            col: props.colId,
            row: props.rowId
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ 
                value: nextProps.value 
            })
        }
    }
    render() {
        const { row, col, value } = this.state
        return (
            <td id={row + ' ' + col} 
                className='cell'
                onClick={()=> this.props.method(row, col)}
            >
            <span>
                {value === 0 ? null : value}
            </span>
            </td>
        )
    }
}