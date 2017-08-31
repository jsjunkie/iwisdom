import React, { Component } from 'react';
import './App.css';
import { getWisdomService, addWisdomService, improveWisdomService } from './service';
import logo from './logo.png';
import Search from './Search';
import Main from './Main';
import AllWisdom from './AllWisdom';
import Wisdom from './Wisdom';
import Rx from 'rxjs/Rx'
import { reducer } from './reducer';

class App extends Component {

  constructor() {
    super();
    this.state = {
		wisdom: [],
		screen: 'main',
		addWisdom : { key: '', title: '', description: ''},
		searchStr: '',
		lookups : []
    };

    this.actionStream = new Rx.Subject();
    this.actionStream.subscribe(action => {
    	var newState = reducer(this.state, action);
    	this.setState(newState);
    })
  }

  componentDidMount(){
  	getWisdomService((data) => {
		this.actionStream.next({type: 'gotWisdom', payload: data});
    	}, (err) => {
      		//this.setState({wisdom: "Error fetching wisdom"});
    	});   
  }

  save (screen) {
	if (this.state.addWisdom.title){
	if (screen === 'add'){
	var addWisdom = this.state.addWisdom;
	addWisdomService(addWisdom, res => {
	 var key = res.insertedIds[0];
	 this.actionStream.next({type: 'addedWisdom', payload: key});
	}, err => {
	   console.log(err);
	});
	} else {
	     var addWisdom = this.state.addWisdom;
	    improveWisdomService(addWisdom, () => {
			this.actionStream.next({type: 'editedWisdom', payload: null});	
	    }, (err) => {
		console.log(err);
	    });
	}
	}
   }

  render() {
    const savebutton = (this.state.screen === 'edit' || this.state.screen === 'add') ? 
			(
				<button onClick={() => this.save(this.state.screen)}>Save</button>
			) : '';
    const homebutton = (this.state.screen === 'edit' || this.state.screen === 'add' || this.state.screen === 'browse') ?
                        (
                                <button onClick={() => this.actionStream.next({type: 'openhome', payload: null})}>Home</button>
                        ) : '';
    const main = this.state.screen === 'main' ? <Main openAdd={() => this.actionStream.next({type: 'openadd', payload: null})} openBrowse={() => this.actionStream.next({type: 'openbrowse', payload: null})}/> : '';
    	const search = this.state.searchStr.toLowerCase();
	var filteredWisdom = search === "" ? this.state.wisdom :  
				this.state.wisdom.filter(item => {
				  return item.title.toLowerCase().indexOf(search) !== -1 || item.description.toLowerCase().indexOf(search) !== -1;
				});
    const browse = this.state.screen === 'browse' ? <AllWisdom wisdom={filteredWisdom} openEdit={(key) => this.actionStream.next({type: 'openedit', payload: key})}/> : '';
    const addedit =  this.state.screen === 'add' || this.state.screen === 'edit'  ? <Wisdom title={this.state.addWisdom.title} description={this.state.addWisdom.description} titleChange={(value) => this.actionStream.next({type: 'titlechange', payload: value})} descChange={(value) => this.actionStream.next({type: 'descchange', payload: value})} lookups = {this.state.lookups} improveLookup = {(key) => this.actionStream.next({type: 'openedit', payload: key})}/> : '';

    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo" onClick={() => this.actionStream.next({type: 'openhome', payload: null})}></img></div>
        </div>
	<Search searchWisdom={(str) => this.actionStream.next({type: 'search', payload: str})} searchStr = {this.state.searchStr}/>
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
