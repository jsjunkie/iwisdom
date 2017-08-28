import React,{ Component } from 'react';
import './Lookup.css';

class Lookup extends Component {

	render () {

		var lookups = this.props.lookups;
		var rows = lookups.map((item) => {
			return (<div key={item.key}>
					<span>{item.title}</span>
					<button onClick={() => this.props.improveLookup(item.key)}>Improve</button>
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
