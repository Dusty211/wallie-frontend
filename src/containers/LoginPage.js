import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    margin: theme.spacing.unit,
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
      password: ''
    };

  }

    handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    // debugger;
    const { classes } = this.props;
    return (
      <div id='login-bar'>
        <form className={classes.container} noValidate autoComplete="off">
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
          autoComplete="current-password"
          margin="normal"
        />
        <Button variant="outlined" className={classes.button}>
        Log in
      </Button>
        </form>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage)
