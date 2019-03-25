import React, { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import { API_ROOT } from '../constants'
import NewJobForm from './NewJobForm'
import MessagesArea from './MessagesArea'
import Cable from './Cable'

class JobList extends Component {
  constructor() {
    super()
    this.state = {
      jobs: [],
      activeJob: null
    }
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/jobs`)
    .then(res => res.json())
    .then(jobs => this.setState({ jobs }))
  }

  handleClick = id => {
    this.setState({ activeJob: id })
  }

  handleReceivedJob = response => {
    const { job } = response
    this.setState({
      jobs: [...this.state.jobs, job]
    })
  }

  handleReceivedMessage = response => {
    const { message } = response
    const jobs = [...this.state.jobs]
    const job = jobs.find(
      job => job.id === message.job_id
    )
    job.messages = [...job.messages, message]
    this.setState({ jobs })
  }
  
  render() {
    const { jobs, activeJob} = this.state
    return (
      <div className="jobsList">
        <ActionCable
          channel={{ channel: 'JobsChannel' }}
          onReceived={this.handleReceivedJob}
        />
        {this.state.jobs.length ? (
          <Cable
            jobs={jobs}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Jobs</h2>
        <ul>{mapJobs(jobs, this.handleClick)}</ul>
        <NewJobForm />
        {activeJob ? (
          <MessagesArea
            job={findActiveJob(
              jobs,
              activeJob
            )}
          />
        ) : null}
      </div>
    )
  }
}

export default JobList

// helpers

const findActiveJob = (jobs, activeJob) => {
  return jobs.find(
    job => job.id === activeJob
  )
}

const mapJobs = (jobs, handleClick) => {
  return jobs.map(job => {
    return (
      <li key={job.id} onClick={() => handleClick(job.id)}>
        {job.title}
      </li>
    )
  })
}