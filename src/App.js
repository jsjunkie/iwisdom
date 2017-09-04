import React, { Component } from 'react';
import './App.css';
import { getWisdomService, addWisdomService, improveWisdomService } from './service';
import logo from './logo.png';
import Search from './Search';
import Main from './Main';
import AllWisdom from './AllWisdom';
import Wisdom from './Wisdom';
import { convertToHashtag } from './Utilities';

class App extends Component {

  constructor() {
    super();
    this.state = {
	wisdom: [],
	screen: 'main',
	addWisdom : { key: '', title: '', description: ''},
	searchStr: '',
	lookups : [],
	hashtag: ''
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
    getWisdomService((data) => {
		var wisdom = data.map(item => {
			return { key: item._id, title: item.title, description: item.description };
		});;
        	this.setState({wisdom: wisdom});
    	}, (err) => {
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
	var lookups = this.findSimilarWisdom(value.trim());
	this.setState({addWisdom: addWisdom, lookups: lookups, hashtag: ''});
   }

   descChange (value, plainText) {
	var addWisdom = Object.assign({}, this.state.addWisdom, {description : value});
	var lookups = this.findSimilarWisdom(plainText.trim());
	this.setState({addWisdom: addWisdom, lookups: lookups, hashtag: ''});
  }

  findSimilarWisdom (value) {
	var valueArr = value.split(" ");
	if (value && valueArr.length > 0){
		var lastWord = valueArr[valueArr.length -1].toLowerCase();
		return this.state.wisdom.filter((item) => {
			return item.title.toLowerCase().indexOf(lastWord) !== -1 || item.description.toLowerCase().indexOf(lastWord) !== -1;
		});
	} else {
		return [];
	}
  }

  hashtagClick (hashtag) {
  	var itemToEdit = this.state.wisdom.filter(item => {
  		return convertToHashtag(item.title) === hashtag;
  	})[0];

  	this.openEdit(itemToEdit.key);
  }

  insertLink (hashtag) {
  	this.setState({hashtag});
  }

   save (screen) {
	if (this.state.addWisdom.title){
	if (screen === 'add'){
	  var newWisdom = this.state.wisdom.slice();
	   var addWisdom = this.state.addWisdom;
	addWisdomService(addWisdom, res => {
	 var key = res.insertedIds[0];
	 newWisdom.push({title: addWisdom.title, description: addWisdom.description, key: key});
	 this.setState({wisdom: newWisdom, addWisdom: {title: '', description: ''}});
         this.openBrowse();
	}, err => {
	   console.log(err);
	});
	} else {
	     var addWisdom = this.state.addWisdom;
	    improveWisdomService(addWisdom, () => {
		var newWisdom = this.state.wisdom.map((item) => {
                return item.key === this.state.addWisdom.key ? Object.assign({}, item, {title: addWisdom.title, description: addWisdom.description}) : item;
            });
            	this.setState({wisdom: newWisdom, addWisdom: {title: '', description: ''}});
          	this.openBrowse();	
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
                                <button onClick={() => this.openHome()}>Home</button>
                        ) : '';
    const main = this.state.screen === 'main' ? <Main openAdd={() => this.openAdd()} openBrowse={() => this.openBrowse()}/> : '';
    	const search = this.state.searchStr.toLowerCase();
	var filteredWisdom = search === "" ? this.state.wisdom :  
				this.state.wisdom.filter(item => {
				  return item.title.toLowerCase().indexOf(search) !== -1 || item.description.toLowerCase().indexOf(search) !== -1;
				});
    const browse = this.state.screen === 'browse' ? <AllWisdom wisdom={filteredWisdom} openEdit={(key) => this.openEdit(key)}/> : '';
    const addedit =  this.state.screen === 'add' || this.state.screen === 'edit'  ? <Wisdom hashtag={this.state.hashtag} hashtagClick={(hashtag) => this.hashtagClick(hashtag)} title={this.state.addWisdom.title} description={this.state.addWisdom.description} titleChange={(value) => this.titleChange(value)} descChange={(description, plainText) => this.descChange(description, plainText)} lookups = {this.state.lookups} insertLink = {(hashtag) => this.insertLink(hashtag)}/> : '';

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
