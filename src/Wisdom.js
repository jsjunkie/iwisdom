import React,{ Component } from 'react';
import './Wisdom.css';

class Wisdom extends Component {
	render () {
	  return (
	    <div className="wisdom">
		<span>{this.props.title}</span>
	    </div>
	  )
	}

}

export default Wisdom;
