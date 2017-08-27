import React, { Component } from 'react';
import Wisdom from './Wisdom';
import './AllWisdom.css';

class AllWisdom extends Component {
	render () {
	   var openEdit = this.props.openEdit;
	  const rows = this.props.wisdom.map(function(item) {
		return <div key={item.key} onClick={() => openEdit(item.key)}><span>{item.title}</span></div>
	  }); 
	  return (
	    <div className="allwisdom">
	      {rows}
	    </div>
	  );
	}	

}

export default AllWisdom;
