import React, { Component, Fragment} from 'react'
import NavBar from '../components/NavBar'
import JobList from '../components/JobList'
import UserPage from './UserPage'
import LoginPage from './LoginPage'
import {Route, Switch, Redirect} from 'react-router-dom'
import { API_ROOT } from '../constants/index'

class WalliePage extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      loading: true,
      currUser: null
    }
  }

  componentDidMount() {

    let token = localStorage.getItem('token')
    if(token) {
      fetch('http://localhost:3000/api/v1/profile', {
        headers:{
          "Authentication": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.user)
        this.setState({
          currUser: data.user
        })
      })
    }
    fetch(`${API_ROOT}/users`)
    .then(res => res.json())
    .then(users => this.setState({
      users,
      loading: false,
      // currUser: users[0]
    }))
  }

  handleLogoutClick = () => {
    localStorage.removeItem('token')
    this.setState({ currUser: null })    
  }

  handleLoginClick = (currUser) => {
    this.setState({ currUser })
  }

  render() {
    return (
      <Fragment>
        <NavBar currUser={this.state.currUser} handleLogoutClick={this.handleLogoutClick}/>
        <Switch>
          <Route path="/users/:id/jobs" render={(props) => {
            if (this.state.currUser && this.state.currUser.id === parseInt(props.match.params.id)) {
              return <JobList currUser={this.state.currUser}/>
            }
          }}/>
          <Route path="/users/:id" render={(props) => {
            let userId = parseInt(props.match.params.id)
            let user = this.state.users.find(user => user.id === userId)
            return this.state.loading ? null : (
              <UserPage user={user}/>
              )
            }}/>
          <Route path="/login" render={() => <LoginPage handleUpdateUser={this.handleUpdateUser} handleLoginClick={this.handleLoginClick} users={this.state.users} checkValidUser={this.checkValidUser}/>}/>
        </Switch>
      </Fragment>
    )
  }
}

export default WalliePage
