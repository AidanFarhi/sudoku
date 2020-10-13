import React from 'react'

export default class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }
    render() {
        return (
            <td className='cell'>
                {this.state.value}
            </td>
        )
    }
}