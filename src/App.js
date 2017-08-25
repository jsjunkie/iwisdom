import React, { Component } from 'react';
import './App.css';
import { API_URL } from './constants';
import { callAPI } from './service';
import logo from './logo.png';
import Search from './Search';
import Main from './Main';

class App extends Component {

  constructor() {
    super();
    this.state = {
	wisdom: null
    };
  }

  componentDidMount(){
    callAPI('GET', API_URL+'/wisdom', (data) => {
      this.setState({wisdom: data});
    }, () => {
      this.setState({wisdom: "Error fetching wisdom"});
    });   
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo"></img></div>
        </div>
	<Search />
	<Main />
	<p>
	 {this.state.wisdom}
	</p>
      </div>
    );
  }

}

export default App;
