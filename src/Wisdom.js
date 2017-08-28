import React,{ Component } from 'react';
import './Wisdom.css';
import Lookup from './Lookup';

class Wisdom extends Component {
	

	render () {
	  const lookups = this.props.lookups;
	  const lookup = lookups.length > 0 ? <Lookup lookups={lookups}/> : '';
	  const edit = (
		<div>
		<input type="text" onChange={(ev) => this.props.titleChange(ev.target.value)} placeholder="Add title.." value={this.props.title}></input>
                <div className="improvewisdom">
                  <textarea placeholder="Add description.." style={ {width: '590px'} } onChange={(event) => this.props.descChange(event.target.value)} value={this.props.description}></textarea>
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
