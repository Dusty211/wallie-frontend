import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm'

class MessagesArea extends Component {
  render() {
    const { id, title, messages, created_at } = this.props.job
    return (
      <div className="messagesArea">
        <h2>{title}</h2>
        <ul>{orderedMessages(messages)}</ul>
        <NewMessageForm job_id={id} />
      </div>
    )
  }
}

export default MessagesArea

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  sortedMessages.forEach(message => {
    let time = new Date(message.created_at)
    message.created_at = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
  })
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.created_at} {message.content}</li>
  })
}