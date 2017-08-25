import React,{ Component } from 'react';
import './Wisdom.css';
import Lookup from './Lookup';

class Wisdom extends Component {

	render () {
	  const span = this.props.editable ? '' : (
		<span>{this.props.title}</span>	
	  );

	  const edit = this.props.editable ? (
		<div>
		<input type="text" value={this.props.title}></input>
                <div className="improvewisdom">
                  <textarea placeholder="Add description.."></textarea>
                  <Lookup />
                </div>
		</div>
		) : '';

	  return (
	    <div className="wisdom">
		{span}
	    	{edit}
	     </div>
	  )
	}
}

export default Wisdom;
