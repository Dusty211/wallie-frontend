import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm'

class MessagesArea extends Component {
  render() {
    const { id, title, messages } = this.props.job
    return (
      <div className="messagesArea">
        <h2>{title}</h2>
        <ul>{orderedMessages(messages, this.props.users)}</ul>
        <NewMessageForm 
          job_id={id} 
          currUser={this.props.currUser} 
        />
      </div>
    )
  }
}

export default MessagesArea

// helpers

const orderedMessages = (messages, users) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  sortedMessages.forEach(message => {
    let time = new Date(message.created_at)
    message.created_at = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
  })
  return sortedMessages.map(message => {
    let userName = users.find(user => user.id === message.user_id)
    return <li key={message.id}>{userName.name} - {message.content} @{message.created_at}</li>
  })
}