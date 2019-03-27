import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CustomizedSnackbars from './Snackbar';
import {Redirect} from 'react-router-dom'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    height: 36,
    marginTop: 25,
    marginLeft: 15,
    // margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class LoginPage extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      failedLogin: false,
      successfulLogin: false,
      loginUser: null
    };
  }

  // componentDidMount() {
  //
  //   const userArray = [
  //     {name: "Kyle", username: "kyle", password: "password", usertype: "muralist"},
  //     {name: "Ross", username: "ross", password: "password", usertype: "muralist"},
  //     {name: "Artem", username: "artem", password: "password", usertype: "muralist"},
  //     {name: "Anthony", username: "anthony", password: "password", usertype: "muralist"},
  //     {name: "Hai", username: "hai", password: "password", usertype: "muralist"},
  //     {name: "Phil", username: "phil", password: "password", usertype: "muralist"},
  //     {name: "Ben", username: "ben", password: "password", usertype: "muralist"},
  //     {name: "Andrea", username: "andrea", password: "password", usertype: "muralist"},
  //     {name: "Chine", username: "Chine", password: "password", usertype: "muralist"},
  //     {name: "Shannon", username: "shannon", password: "password", usertype: "wallist"},
  //     {name: "Chris", username: "chris", password: "password", usertype: "wallist"},
  //     {name: "Heloise", username: "heloise", password: "password", usertype: "wallist"},
  //     {name: "Mathew", username: "mathew", password: "password", usertype: "wallist"},
  //     {name: "Ryan", username: "ryan", password: "password", usertype: "wallist"},
  //     {name: "Shinik", username: "shinik", password: "password", usertype: "wallist"},
  //     {name: "Benjamin", username: "benjamin", password: "password", usertype: "wallist"},
  //     {name: "James", username: "james", password: "password", usertype: "wallist"},
  //     {name: "Serven", username: "serven", password: "password", usertype: "wallist"}
  //   ]
  //
  //   userArray.forEach(user => {
  //
  //     fetch('http://localhost:3000/api/v1/users', {
  //        method: 'POST',
  //        headers: {
  //          'Content-Type': 'application/json',
  //          Accept: 'application/json'
  //        },
  //        body: JSON.stringify({
  //          user: {
  //            name: `${user.name}`,
  //            username: `${user.username}`,
  //            password: `${user.password}`,
  //            usertype: `${user.usertype}`
  //          }
  //        })
  //      })
  //        .then(r => r.json())
  //        .then(console.log)
  //
  //   })
  //
  // }

// componentDidMount() {
//  fetch('http://localhost:3000/api/v1/users', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json',
//      Accept: 'application/json'
//    },
//    body: JSON.stringify({
//      user: {
//        name: 'Nick Nolte',
//        username: 'nick',
//        password: 'password',
//        usertype: 'wallist'
//      }
//    })
//  })
//    .then(r => r.json())
//    .then(console.log)
// }
handleLoginSubmit = (e) => {
  e.preventDefault()
  fetch('http://localhost:3000/api/v1/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
     },
     body: JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password
          }
     })
   })
     .then(r => r.json())
     .then(data => {
       if(data.authenticated) {
      console.log('authSUCCESS')
         this.setState({
           failedLogin: false,
           successfulLogin: true,
           loginUser: data.user
          })
          this.props.handleLoginClick(data.user)
          localStorage.setItem('token', data.jwt)
       }else{
         console.log('authFAIL')
         this.setState({
           username: '',
           password: '',
           failedLogin: true
           })
       }})

}



  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // checkValidUser = () => {
  //   let currUser = this.props.users.find(user => this.state.username === user.username)
  //   if (currUser && currUser.password === this.state.password) {
  //     this.setState({
  //       failedLogin: false,
  //       successfulLogin: true,
  //       loginUser: currUser
  //      })
  //     this.props.handleLoginClick(currUser)
  //   }
  //   else {
  //     this.setState({
  //       username: '',
  //       password: '',
  //       failedLogin: true
  //     })
  //   }
  // }

  handleClose = () => {
    this.setState({ failedLogin: false });
  };

  render() {
    const { classes } = this.props;
    return this.state.successfulLogin ?
    <Redirect to = {`/users/${this.state.loginUser.id}`} />
     : (
      <div id='login-bar'>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleLoginSubmit}>
          <TextField
            id="standard-name"
            label="Username"
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleChange('username')}
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            autoComplete="current-password"
            margin="normal"
          />
          <Button variant="outlined" type="submit" className={classes.button} >
            Log in
          </Button>
          <CustomizedSnackbars handleClose={this.handleClose} failedLogin={this.state.failedLogin} />
        </form>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage)
