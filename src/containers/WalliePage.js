import React, { Component, Fragment} from 'react'
import NavBar from '../components/NavBar'
import JobList from '../components/JobList'
import FindDialog from '../components/FindDialog'
import UserPage from './UserPage'
import LoginPage from './LoginPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import { API_ROOT } from '../constants/index'

class WalliePage extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      loading: true,
      currUser: null,
      showFindDialog: false
    }
  }

  componentDidMount() {
    fetch(`${API_ROOT}/users`)
    .then(res => res.json())
    .then(users => this.setState({ 
      users, 
      loading: false, 
    }))
  }

  handleLogoutClick = () => {
    this.setState({ currUser: null })
  }

  handleLoginClick = (currUser) => {
    this.setState({ currUser })
  }

  showFindUser = () => {
    this.setState({ showFindDialog: true })
  }

  handleFindClose = () => {
    this.setState({ showFindDialog: false })
  }

  handleFindUser = (userSearch) => {
    console.log('finding', userSearch)
  }

  render() {
    return (
      <Fragment>
        <FindDialog 
          showFindDialog={this.state.showFindDialog} 
          handleFindClose={this.handleFindClose} 
          handleFindUser={this.handleFindUser}
        />
        <NavBar 
          currUser={this.state.currUser} 
          handleLogoutClick={this.handleLogoutClick}
          showFindUser={this.showFindUser}
        />
        <Switch>
          <Route path="/login" render={() => (
            <LoginPage
              handleLoginClick={this.handleLoginClick}
              users={this.state.users}
              checkValidUser={this.checkValidUser}
            />)
          }/>
          <Route path="/users/:id/jobs" render={(props) => {
            if (this.state.currUser && this.state.currUser.id === parseInt(props.match.params.id)) {
              return <JobList currUser={this.state.currUser}/>
            }
            else if (!this.state.currUser) {
              return <Redirect to="/login"/>
            }
          }}/>
          <Route path="/users/:id" render={(props) => {
            let userId = parseInt(props.match.params.id)
            let user = this.state.users.find(user => user.id === userId)
            if (this.state.loading) {
              return null
            }
            else if (!this.state.currUser) {
              return <Redirect to="/login"/>
            }
            else {
              return <UserPage currUser={this.state.currUser} user={user}/>
            }
          }}/>
        </Switch>
      </Fragment>
    )
  }
}

export default WalliePage
