import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
	render () {
                return (
                  <input type="text" autoFocus onChange={(event) => this.props.searchWisdom(event.target.value)} placeholder="search wisdom.." value={this.props.searchStr}></input>
                );
        }
}

export default Search;
