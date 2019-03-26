import React, { Component, Fragment } from 'react'
import CardGrid from './CardGrid'
import OfferDialog from '../components/OfferDialog'
import { Typography } from '@material-ui/core';
import { API_ROOT, HEADERS } from '../constants'

class UserPage extends Component {
  constructor(props) {
    super()
    if (props.user.usertype === "muralist") {
      this.state = {
        pieces: [...props.user.murals],
        jobs: [...props.user.assignments],
        showOfferDialog: false
      }
    }
    else {
      this.state = {
        pieces: [...props.user.walls],
        jobs: [...props.user.offers],
        showOfferDialog: false
      }
    }
  }

  handleStarClick = piece => {
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

  handleInfoClick = () => {
    if (this.props.currUser !== this.props.user) {
      this.setState({ showOfferDialog: true })
    }
  }

  handleDialogClose = () => {
    this.setState({ showOfferDialog: false })
  }

  handleDialogSendRequest = (jobTitle) => {
    console.log('sending', jobTitle, this.state.jobs, this.props.currUser, this.props.user)
    if (this.props.currUser && this.props.currUser !== this.props.user) {

      fetch(`${API_ROOT}/users/${this.props.user.id}/jobs`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          title: jobTitle,
          active: false,
          accepted: false,
          requester_id: this.props.currUser.id,
          requestee_id: this.props.user.id
        })
      })
    }
    else {
      console.log('there is no current user')
    }
    this.handleDialogClose()
  }

  render() {
    // const jobOffers = this.state.map
    return (
      <Fragment>
        
        <OfferDialog 
          showOfferDialog={this.state.showOfferDialog} 
          handleDialogClose={this.handleDialogClose}
          handleDialogSendRequest={this.handleDialogSendRequest}
        />
        <Typography variant="h5" color="inherit" className="welcome">Wallie</Typography>
        <CardGrid 
          pieces={this.state.pieces} 
          user={this.props.user} 
          handleStarClick={this.handleStarClick} 
          handleInfoClick={this.handleInfoClick}
        />
      </Fragment>
    )
  }
}

export default UserPage
