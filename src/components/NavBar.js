import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const styles = {
  menuButton: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

export class NavBar extends Component {
  render() {
    const { classes } = this.props
    return (
      <header color="secondary">
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit">
              <Menu />
            </IconButton>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              Wallie
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </header>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
