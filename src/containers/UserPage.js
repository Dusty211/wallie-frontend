import React, { Component, Fragment } from 'react'
import CardGrid from './CardGrid'
import { Typography } from '@material-ui/core';
import { API_ROOT, HEADERS } from '../constants'

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

  handleStarClick = piece => {
    console.log(this)
    piece.rating++
    let myPieces = this.state.pieces.map(p => p.id === piece.id ? piece : p )
    fetch(`${API_ROOT}/murals/${piece.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ 
        image: piece.image,
        rating: piece.rating,
        user_id: piece.user_id
      })
    })
    .then(resp => resp.json())
    this.setState({pieces: myPieces})
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Typography variant="h5" color="inherit" className="welcome">W</Typography>
        <Typography variant="h5" color="inherit" className="welcome"> Welcome, {this.props.user.name}!</Typography>
        <CardGrid pieces={this.state.pieces} user={this.props.user} handleStarClick={this.handleStarClick}/>
      </Fragment>
    )
  }
}

export default UserPage
