import React, { Component, Fragment} from 'react'
import NavBar from '../components/NavBar'
import JobList from '../components/JobList'
import UserPage from './UserPage'
import LoginPage from './LoginPage'
import {Route, Redirect, Switch} from 'react-router-dom'
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
    fetch(`${API_ROOT}/users`)
    .then(res => res.json())
    .then(users => this.setState({ users, loading: false }))
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <Switch>
          <Route path="/users/:id" render={(props) => {
            let userId = parseInt(props.match.params.id)
            let user = this.state.users.find(user => user.id === userId)
            return this.state.loading ? null : (
              <UserPage user={user}/>
              )
            }}/>
          <Route path="/jobs" component={JobList}/>
          <Route path="/login" render={() => <LoginPage users={this.state.users} checkValidUser={this.checkValidUser}/>}/>
        </Switch>
      </Fragment>
    )
  }
}

export default WalliePage
