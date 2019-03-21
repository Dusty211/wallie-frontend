import React, { Component, Fragment} from 'react'
import NavBar from '../components/NavBar'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import WallieTheme from '../theme.json';

const theme = createMuiTheme(WallieTheme);

export class WalliePage extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <NavBar />
        This is Wallie
      </MuiThemeProvider>
    )
  }
}

export default WalliePage
