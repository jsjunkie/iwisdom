import React,{ Component } from 'react';
import './Wisdom.css';
import Lookup from './Lookup';

class Wisdom extends Component {
	

	render () {
	  const lookup = this.props.showLookup ? <Lookup /> : '';
	  const edit = (
		<div>
		<input type="text" onChange={(ev) => this.props.titleChange(ev.target.value)} placeholder="Add title.." value={this.props.title}></input>
                <div className="improvewisdom">
                  <textarea placeholder="Add description.." style={this.props.showLookup ? {width: '320px'} : {width: '590px'} } onChange={(event) => this.props.descChange(event.target.value)} value={this.props.description}></textarea>
                  {lookup}
                </div>
		</div>
		);
	  return (
	    <div className="wisdom">
	    	{edit}
	     </div>
	  )
	}
}

export default Wisdom;
