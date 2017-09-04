import React,{ Component } from 'react';
import './Lookup.css';
import { convertToHashtag } from './Utilities';

class Lookup extends Component {

	render () {

		var lookups = this.props.lookups;
		var rows = lookups.map((item) => {
			var hashtag = convertToHashtag(item.title);
			return (<div key={item.key}>
					<span>{item.title}</span>
					<button onClick={() => this.props.insertLink(hashtag)}>Insert</button>
				</div>);
		});	
		return (
		   <div className="lookup">
			<div className = "lookupHeading">Wisdom like this:</div>
			{rows}
		     </div>
		);
	
	}
}

export default Lookup;
