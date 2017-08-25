import React, { Component } from 'react';
import Wisdom from './Wisdom';
import './AllWisdom.css';

class AllWisdom extends Component {
	render () {
	  return (
	    <div className="allwisdom">
	    	<Wisdom title="First one"/>
	    	<Wisdom title="Second pj"/>
	    </div>
	  );
	}	

}

export default AllWisdom;
