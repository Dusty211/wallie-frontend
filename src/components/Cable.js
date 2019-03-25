import React, { Fragment } from 'react'
import { ActionCable } from 'react-actioncable-provider'

const Cable = ({ jobs, handleReceivedMessage }) => {
  return (
    <Fragment>
      {jobs.map(job => {
        return (
          <ActionCable 
            key={job.id}
            channel={{ channel: 'MessagesChannel', job: job.id}}
            onReceived={handleReceivedMessage}
          />
        )
      })}
    </Fragment>
  )
}

export default Cable
