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
	  { key: 1, title: "First", description: "Fer des", editable: false },
	  { key: 2, title: "Second", description: "Se des", editable: false }
	],
	screen: 'main',
	addWisdom : { title: '', description: ''}
    };
  }

  openEdit (key) {
	var newWisdom = this.state.wisdom.map((item) => {
	  if(item.key === key){
	     return Object.assign({}, item, {editable: !item.editable});
	  } else {
	     return Object.assign({}, item, {editable: false});	
	  }
	})

	
  this.setState({wisdom: newWisdom});
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
	var newWisdom = this.state.wisdom.map((item) => {
          return Object.assign({}, item, {editable:false});
        });
	this.setState({screen: 'main', wisdom: newWisdom});
   }

   save (screen) {debugger;
	if (screen === 'add' && this.state.addWisdom.title){
	  var newWisdom = this.state.wisdom.slice();
	   var addWisdom = this.state.addWisdom;
	  newWisdom.push({title: addWisdom.title, description: addWisdom.description, editable: false});
	  this.setState({wisdom: newWisdom, addWisdom: {title: '', description: ''}});
	  //save State
	  this.openBrowse();
	} else {

	}
   }

  render() {
    const buttons = (this.state.screen === 'browse' || this.state.screen === 'add') ? 
			(<div>
				<button onClick={() => this.save(this.state.screen)}>Save</button>
				<button onClick={() => this.openHome()}>Home</button>
			</div>) : '';
    const main = this.state.screen === 'main' ? <Main openAdd={() => this.openAdd()} openBrowse={() => this.openBrowse()}/> : '';
    const browse = this.state.screen === 'browse' ? <AllWisdom wisdom={this.state.wisdom} openEdit={(key) => this.openEdit(key)}/> : '';
    const add = this.state.screen === 'add' ? <Wisdom title={this.state.addWisdom.title} description={this.state.addWisdom.description} editable="true" openEdit={() => {}}/> : '';
    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo" onClick={() => this.openHome()}></img></div>
        </div>
	<Search />
	{buttons}
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
