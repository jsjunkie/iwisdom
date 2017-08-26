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
	wisdom: [
	  { key: 1, title: "First", description: "Fer des" },
	  { key: 2, title: "Second", description: "Se des" }
	],
	screen: 'main'
    };
  }

  componentDidMount(){
    callAPI('GET', API_URL+'/wisdom', (data) => {
      //this.setState({wisdom: data});
    }, () => {
      //this.setState({wisdom: "Error fetching wisdom"});
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
    const home = this.state.screen === 'browse' ? (<div><button onClick={() => this.openHome()}>Home</button></div>) : '';
    const main = this.state.screen === 'main' ? <Main openAdd={() => this.openAdd()} openBrowse={() => this.openBrowse()}/> : '';
    const browse = this.state.screen === 'browse' ? <AllWisdom wisdom={this.state.wisdom}/> : '';
    const add = this.state.screen === 'add' ? <Wisdom editable="true"/> : '';
    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo" onClick={() => this.openHome()}></img></div>
        </div>
	<Search />
	{home}
	{main}
	{browse}
	{add}
	<p>
	</p>
      </div>
    );
  }

}

export default App;
