import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { styled } from '@material-ui/styles'
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

const MyAppBar = styled(AppBar)({
  background: 'linear-gradient(20deg, #3949ab 30%, #039be5 80%)',
  borderRadius: 5,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
})

class NavBar extends Component {
  render() {
    const { classes } = this.props
    return (
      <MyAppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit">
            <Menu />
          </IconButton>
          <Typography variant="h5" color="inherit" className={classes.grow}>
            Wallie
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </MyAppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
