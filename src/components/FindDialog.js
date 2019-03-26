import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog, Button, TextField } from '@material-ui/core';

class FindDialog extends Component {
  constructor() {
    super()
    this.state = {
      userName: ''
    }
  }

  handleTextField = () => {
    this.setState({
      userName: document.querySelector('#user-name').value
    })
  }

  render() {
    const { showFindDialog, handleFindClose, handleFindUser } = this.props
    return (
      <div>
        <Dialog open={showFindDialog}>
          <DialogTitle id="alert-dialog-title">{"Would you like to find?"}</DialogTitle>
          <TextField
            autoFocus
            margin="normal"
            id="user-name"
            label="Job Title"
            onChange={this.handleTextField}
          />
          <DialogActions>
            <Button onClick={handleFindClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleFindUser(this.state.userName)} color="primary" autoFocus>
              Find
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FindDialog;