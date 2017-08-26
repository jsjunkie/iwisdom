import React,{ Component } from 'react';
import './Wisdom.css';
import Lookup from './Lookup';

class Wisdom extends Component {

	render () {
	  const span = this.props.editable ? '' : (
		<span>{this.props.title}</span>	
	  );

	  const edit = this.props.editable? (
		<div>
		<input type="text" placeholder="Add title.." value={this.props.title}></input>
                <div className="improvewisdom">
                  <textarea placeholder="Add description.." value={this.props.description}></textarea>
                  <Lookup />
                </div>
		</div>
		) : '';
	  const key = this.props.key;
	  return (
	    <div className="wisdom" onClick={() => this.props.openEdit()}>
		{span}
	    	{edit}
	     </div>
	  )
	}
}

export default Wisdom;
