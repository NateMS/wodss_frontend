import React, { Component } from 'react'
import './Alert.css'

export class Alert extends Component {
    render() {
        let messages = this.props.messages;

        if (messages.length > 0) {
            return (
                <div className={"alert alert-" + this.props.type}>
                    Please fix these errors first:
                    <ul>
                        {messages.map(message => <li>- {message}</li>)}
                    </ul>
                </div>

            )
        }

        return null 
    }
}

export default Alert
