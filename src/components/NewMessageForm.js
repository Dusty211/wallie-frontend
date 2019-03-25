import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../constants'

class NewMessageForm extends Component {
  constructor(props) {
    super()
    this.state = {
      content: '',
      job_id: props.job_id,
      user_id: 1
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ job_id: nextProps.job_id })
  }
  
  handleChange = e => {
    this.setState({ content: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
    this.setState({ content: '' })
  }

  render() {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <input 
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default NewMessageForm
