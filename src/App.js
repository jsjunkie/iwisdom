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
	searchStr: ''
    };
  }

  searchWisdom (str) {
	this.setState({searchStr: str, screen: str === '' ? 'main' : 'browse'});
  }

  openEdit (key) {
  	var addWisdom = this.state.wisdom.filter((item) => {
		return item.key === key;
	})[0];
	addWisdom.editable = true;
	this.setState({addWisdom: addWisdom, screen: 'edit'});
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
	this.setState({addWisdom: addWisdom, screen: 'add'});
    }

    openBrowse () {
	this.setState({screen: 'browse'});
   }

   openHome () {
	this.setState({screen: 'main'});
   }

   titleChange (value) {
	var addWisdom = Object.assign({}, this.state.addWisdom, {title: value});
	this.setState({addWisdom: addWisdom});
   }

   descChange (value) {
	var addWisdom = Object.assign({}, this.state.addWisdom, {description : value});
	this.setState({addWisdom: addWisdom});
  }

   save (screen) {
	if (this.state.addWisdom.title){
	if (screen === 'add'){
	  var newWisdom = this.state.wisdom.slice();
	   var addWisdom = this.state.addWisdom;
	//add key
	  newWisdom.push({title: addWisdom.title, description: addWisdom.description});
	} else {
	    var newWisdom = this.state.wisdom.map((item) => {
		return item.key === this.state.addWisdom.key ? Object.assign({}, item, this.state.addWisdom) : item;
	    });	    
	}
	this.setState({wisdom: newWisdom, addWisdom: {title: '', description: ''}});
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
    const addedit =  this.state.screen === 'add' || this.state.screen === 'edit'  ? <Wisdom title={this.state.addWisdom.title} description={this.state.addWisdom.description} titleChange={(value) => this.titleChange(value)} descChange={(value) => this.descChange(value)}/> : '';

    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo" onClick={() => this.openHome()}></img></div>
        </div>
	<Search searchWisdom={(str) => this.searchWisdom(str)}/>
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
