import React,{ Component } from 'react';
import './Wisdom.css';
import Lookup from './Lookup';

class Wisdom extends Component {

	constructor () {
                super();
                this.state = {
                  editable: false
                }
          }
	render () {
	  const span = this.state.editable || this.props.editable ? '' : (
		<span>{this.props.title}</span>	
	  );

	  const edit = this.state.editable || this.props.editable? (
		<div>
		<input type="text" placeholder="Add title.." value={this.props.title}></input>
                <div className="improvewisdom">
                  <textarea placeholder="Add description.." value={this.props.description}></textarea>
                  <Lookup />
                </div>
		</div>
		) : '';

	  return (
	    <div className="wisdom" onClick={() => this.setState({editable: true})}>
		{span}
	    	{edit}
	     </div>
	  )
	}
}

export default Wisdom;
