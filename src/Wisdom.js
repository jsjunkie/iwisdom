import React,{ Component } from 'react';
import './Wisdom.css';
import Lookup from './Lookup';

class Wisdom extends Component {
	render () {
	  return (
	    <div className="wisdom">
		<span>{this.props.title}</span>
		<input type="text" value={this.props.title}></input>
		<div className="improvewisdom">
                  <textarea placeholder="Add description.."></textarea>
        	  <Lookup />    
		</div>
	    </div>
	  )
	}
}

export default Wisdom;
