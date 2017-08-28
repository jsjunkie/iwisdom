import React,{ Component } from 'react';
import './Lookup.css';

class Lookup extends Component {

	render () {

		var lookups = this.props.lookups;
		var rows = lookups.map((item) => {
			return (<div key={item.key}>
					<span>{item.title}</span>
					<button>Improve</button>
				</div>);
		});	
		return (
		   <div className="lookup">
			{rows}
		     </div>
		);
	
	}
}

export default Lookup;
