import React,{ Component } from 'react';
import './Wisdom.css';
import Lookup from './Lookup';
import WisdomEditor from './WisdomEditor';

class Wisdom extends Component {
	

	render () {
	  const lookups = this.props.lookups;
	 const improveLookup = this.props.improveLookup;
	  const lookup = lookups.length > 0 ? <Lookup lookups={lookups} improveLookup = {(key) => this.props.improveLookup(key)}/> : '';
	  const edit = (
		<div style={{display:'inline-block'}}>
		<input type="text" onChange={(ev) => this.props.titleChange(ev.target.value)} placeholder="Add title.." value={this.props.title}></input>
                <div className="improvewisdom">
                  <WisdomEditor hashtagClick={(hashtag) => this.props.hashtagClick(hashtag)} description= {this.props.description} descChange={(description, plainText) => this.props.descChange(description, plainText)}/>
                </div>
		</div>
		);
	  return (
	    <div className="wisdom">
	    	{edit}
	        {lookup}
	     </div>
	  )
	}
}

export default Wisdom;
