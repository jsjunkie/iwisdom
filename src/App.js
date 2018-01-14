import React, { Component } from 'react';
import './App.css';
import { getWisdomService, addWisdomService, improveWisdomService } from './service';
import logo from './logo.png';
import Search from './Search';
import Main from './Main';
import AllWisdom from './AllWisdom';
import Wisdom from './Wisdom';
import { reducer } from './reducer';

class App extends Component {

  constructor() {
    super();
    this.state = {
		wisdom: [],
		screen: 'main',
		addWisdom : { key: '', title: '', description: ''},
		searchStr: '',
		lookups : [],
		hashtag: '',
		history: [],
		saving: false
    };
  }

  componentDidMount(){
   getWisdomService((data) => {
               this.pushToActionStream('gotWisdom', data);
       }, (err) => {
				console.log(err);
	       });   
  }

  pushToActionStream (type, payload) {
  	var newState = reducer(this.state, {type, payload});
    this.setState(newState);
  }

  save (screen) {
	if (this.state.addWisdom.title && !this.state.saving){
	this.setState({saving: true});
	if (screen === 'add'){
	   var addWisdom = this.state.addWisdom;
		addWisdomService(addWisdom, res => {
	 		var key = res.insertedIds[0];
	 		this.pushToActionStream('addedWisdom', key);
	 		this.setState({saving: false})
		}, err => {
	   		console.log(err);
	   		this.setState({saving: false})

		});
	} else {
	     var addWisdom = this.state.addWisdom;
	    improveWisdomService(addWisdom, () => {
			this.pushToActionStream('editedWisdom', null)
		 	this.setState({saving: false})
	
	    }, (err) => {
			console.log(err);
	 		this.setState({saving: false})
	    });
	}
	}
   }

  render() {
  	const backbutton = (this.state.history.length > 0 && this.state.screen === 'edit') ? 
			(
				<button className="topButton" onClick={() => this.pushToActionStream('back', null)}>Back</button>
			) : '';
    const savebutton = (this.state.screen === 'edit' || this.state.screen === 'add') ? 
			(
				<button className="topButton" onClick={() => this.save(this.state.screen)}>Save</button>
			) : '';
    const homebutton = (this.state.screen === 'edit' || this.state.screen === 'add' || this.state.screen === 'browse') ?
                        (
                                <button className="topButton" onClick={() => this.pushToActionStream('openhome', null)}>Home</button>
                        ) : '';
    const main = this.state.screen === 'main' ? <Main openAdd={() => this.pushToActionStream('openadd', null)} openBrowse={() => this.pushToActionStream('openbrowse', null)}/> : '';
    	const search = this.state.searchStr.toLowerCase();
	var filteredWisdom = search === "" ? this.state.wisdom :  
				this.state.wisdom.filter(item => {
				  return item.title.toLowerCase().indexOf(search) !== -1 || item.description.toLowerCase().indexOf(search) !== -1;
				});
    const browse = this.state.screen === 'browse' ? <AllWisdom wisdom={filteredWisdom} openEdit={(key) => this.pushToActionStream('openedit', key)}/> : '';
    const addedit =  this.state.screen === 'add' || this.state.screen === 'edit'  ? <Wisdom hashtag={this.state.hashtag} hashtagClick={(hashtag) => this.pushToActionStream('hashtagclick', hashtag)} key = {this.state.addWisdom.key} title={this.state.addWisdom.title} description={this.state.addWisdom.description} titleChange={(value) => this.pushToActionStream('titlechange', value)} descChange={(description, plainText) => this.pushToActionStream('descchange', {description, plainText})} lookups = {this.state.lookups} insertLink = {(hashtag) => this.pushToActionStream('insertlink', hashtag)}/> : '';

    return (
      <div className="App">
        <div className="App-header">
          <div><img className="App-logo" src ={logo} alt="logo" onClick={() => this.pushToActionStream('openhome', null)}></img></div>
        </div>
	<Search searchWisdom={(str) => this.pushToActionStream('search', str)} searchStr = {this.state.searchStr}/>
	<div>
	{backbutton}
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
