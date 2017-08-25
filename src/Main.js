import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
	render() {
	  return (
	    <div>
		<div className="box" onClick={this.props.openAdd}>
		  <span>Add Wisdom</span>
		</div>
		<div className="box" onClick={this.props.openBrowse}>
                  <span>Browse Wisdom</span>
                </div>
	    </div>
	  );
	}
}

export default Main;
