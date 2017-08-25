import React, { Component } from 'react';
import './App.css';
import { API_URL } from './constants';
import { callAPI } from './service';
import logo from './logo.png';
import Search from './Search';
import Main from './Main';
import AllWisdom from './AllWisdom';
import Wisdom from './Wisdom';

class App extends Component {

  constructor() {
    super();
    this.state = {
	wisdom: null,
	screen: 'main'
    };
  }

  componentDidMount(){
    callAPI('GET', API_URL+'/wisdom', (data) => {
      this.setState({wisdom: data});
    }, () => {
      this.setState({wisdom: "Error fetching wisdom"});
    });   
  }

   openAdd () {
	this.setState({screen: 'add'});
    }

    openBrowse () {
	this.setState({screen: 'browse'});
   }

   openHome () {
	this.setState({screen: 'main'});
   }

  render() {
    const main = this.state.screen === 'main' ? <Main openAdd={() => this.openAdd()} openBrowse={() => this.openBrowse()}/> : '';
    const browse = this.state.screen === 'browse' ? <AllWisdom /> : '';
    const add = this.state.screen === 'add' ? <Wisdom editable="true"/> : '';
    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo" onClick={() => this.openHome()}></img></div>
        </div>
	<Search />
	{main}
	{browse}
	{add}
	<p>
	 {this.state.wisdom}
	</p>
      </div>
    );
  }

}

export default App;
