import React, { Component } from 'react';
import 'typeface-roboto'
// import './App.css';
import WalliePage from './containers/WalliePage'
// import JobList from './components/JobList'
import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <JobList />
      // </div>
      <Router><WalliePage /></Router>
    )
  }
}

export default App;
