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
	screen: 'main',
	addWisdom : { key: '', title: '', description: ''},
	searchStr: '',
	lookups : []
    };
  }

  searchWisdom (str) {
	this.setState({searchStr: str, screen: str === '' ? 'main' : 'browse'});
  }

  openEdit (key) {
  	var addWisdom = this.state.wisdom.filter((item) => {
		return item.key === key;
	})[0];
	this.setState({addWisdom: addWisdom, screen: 'edit', lookups: []});
  }
 

  componentDidMount(){
    callAPI('GET', API_URL+'/wisdom', (data) => {
      //this.setState({wisdom: data});
    }, () => {
      //this.setState({wisdom: "Error fetching wisdom"});
    });   
  }

   openAdd () {
	var addWisdom = {key: '', title: '', description: ''};
	this.setState({addWisdom: addWisdom, screen: 'add', lookups: []});
    }

    openBrowse () {
	this.setState({screen: 'browse'});
   }

   openHome () {
	this.setState({screen: 'main', searchStr: ''});
   }

   titleChange (value) {
	var addWisdom = Object.assign({}, this.state.addWisdom, {title: value});
	var lookups = value !== "" ?  [{ key: 1, title: "First", description: "Fer des" },
          { key: 2, title: "Second", description: "Se des" }] : [];
	this.setState({addWisdom: addWisdom, lookups: lookups});
   }

   descChange (value) {
	var addWisdom = Object.assign({}, this.state.addWisdom, {description : value});
	var lookups = value !== "" ? [{ key: 1, title: "First", description: "Fer des" },
          { key: 2, title: "Second", description: "Se des" }] : [];
	this.setState({addWisdom: addWisdom, lookups: lookups});
  }

   save (screen) {
	if (this.state.addWisdom.title){
	if (screen === 'add'){
	  var newWisdom = this.state.wisdom.slice();
	   var addWisdom = this.state.addWisdom;
	//add key
	  newWisdom.push({title: addWisdom.title, description: addWisdom.description});
	} else {
	     var addWisdom = this.state.addWisdom;
	    var newWisdom = this.state.wisdom.map((item) => {
		return item.key === this.state.addWisdom.key ? Object.assign({}, item, {title: addWisdom.title, description: addWisdom.description}) : item;
	    });	    
	}
	this.setState({wisdom: newWisdom, addWisdom: {title: '', description: '', showLookup: false}});
          //save State
          this.openBrowse();
	}
   }

  render() {
    const savebutton = (this.state.screen === 'edit' || this.state.screen === 'add') ? 
			(
				<button onClick={() => this.save(this.state.screen)}>Save</button>
			) : '';
    const homebutton = (this.state.screen === 'edit' || this.state.screen === 'add' || this.state.screen === 'browse') ?
                        (
                                <button onClick={() => this.openHome()}>Home</button>
                        ) : '';
    const main = this.state.screen === 'main' ? <Main openAdd={() => this.openAdd()} openBrowse={() => this.openBrowse()}/> : '';
    	const search = this.state.searchStr.toLowerCase();
	var filteredWisdom = search === "" ? this.state.wisdom :  
				this.state.wisdom.filter(item => {
				  return item.title.toLowerCase().indexOf(search) !== -1 || item.description.toLowerCase().indexOf(search) !== -1;
				});
    const browse = this.state.screen === 'browse' ? <AllWisdom wisdom={filteredWisdom} openEdit={(key) => this.openEdit(key)}/> : '';
    const addedit =  this.state.screen === 'add' || this.state.screen === 'edit'  ? <Wisdom title={this.state.addWisdom.title} description={this.state.addWisdom.description} titleChange={(value) => this.titleChange(value)} descChange={(value) => this.descChange(value)} lookups = {this.state.lookups}/> : '';

    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo" onClick={() => this.openHome()}></img></div>
        </div>
	<Search searchWisdom={(str) => this.searchWisdom(str)} searchStr = {this.state.searchStr}/>
	<div>
	{savebutton}
	{homebutton}
	</div>
	{main}
	{browse}
	{addedit}
      </div>
    );
  }

}

export default App;
