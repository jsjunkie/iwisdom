import React, { Component } from 'react';
import Wisdom from './Wisdom';
import './AllWisdom.css';

class AllWisdom extends Component {
	render () {
	  const rows = this.props.wisdom.map(function(item) {
		return <Wisdom key={item.key} title={item.title} description={item.desciption} editable={item.editable} openEdit={() => item.openEdit(item.key)}/>
	  }); 
	  return (
	    <div className="allwisdom">
	      {rows}
	    </div>
	  );
	}	

}

export default AllWisdom;
