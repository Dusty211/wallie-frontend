import React, { Component, Fragment } from 'react'
import CardGrid from './CardGrid'
import { Typography } from '@material-ui/core';

class UserPage extends Component {
  constructor(props) {
    super()
    if (props.user.usertype === "muralist") {
      this.state = {
        pieces: [...props.user.murals],
        jobs: [...props.user.assignments]
      }
    }
    else {
      this.state = {
        pieces: [...props.user.walls],
        jobs: [...props.user.offers]
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Typography variant="h5" color="inherit" className="welcome">W</Typography>
        <Typography variant="h5" color="inherit" className="welcome"> Welcome, {this.props.user.name}!</Typography>
        <CardGrid pieces={this.state.pieces} />
      </Fragment>
    )
  }
}

export default UserPage
