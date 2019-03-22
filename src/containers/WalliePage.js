import React, { Component, Fragment} from 'react'
import NavBar from '../components/NavBar'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import WallieTheme from '../theme.json';
import UserPage from './UserPage'
import LoginPage from './LoginPage'
import {Route, Redirect, Switch} from 'react-router-dom'

const theme = createMuiTheme(WallieTheme);

export class WalliePage extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route path="/users" component={UserPage}/>
          <Route path="/login" component={LoginPage}/>
        </Switch>
      </MuiThemeProvider>
    )
  }
}

export default WalliePage
