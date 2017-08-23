import React, { Component } from 'react';
import './App.css';
import { API_URL } from './constants';

class App extends Component {

  constructor() {
    super();
    this.state = {
	wisdom: null
    };
  }

  componentDidMount(){
    this.makeAJAXCall('GET', API_URL, (data) => {
      this.setState({wisdom: data});
    });   
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to iWisdom</h2>
        </div>
        <p className="App-intro">
          iWisdom is an application to manage knowledge/wisdom in your organisation.
	</p>
	<p>
	 {this.state.wisdom}
	</p>
      </div>
    );
  }

  makeAJAXCall(methodType, url, callback){
   var xhr = new XMLHttpRequest();
   xhr.open(methodType, url, true);
   xhr.onreadystatechange = function(){
         if (xhr.readyState === 4 && xhr.state === 200){
             callback(xhr.response);
         }
     }
     xhr.send();
   console.log("request sent to the server");
  }
}

export default App;
