import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator, convertFromRaw, convertToRaw, Modifier	} from 'draft-js';
import './WisdomEditor.css';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'}
];

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

class WisdomEditor extends Component {

	constructor (props) {
		super(props);
		
		var hashtagDecorator = new CompositeDecorator([
			{
				strategy: hashtagStrategy,
				component: HashtagSpan,
				props: {hashtagClick: this.props.hashtagClick}
			}
		]);

		var description = this.props.description;
		if (description){
			var currentContent = convertFromRaw(JSON.parse(description));
			this.state = {
				editorState: EditorState.createWithContent(currentContent, hashtagDecorator)
			}
		} else {
			this.state = {
				editorState: EditorState.createEmpty(hashtagDecorator)
			}
		}
	}

	onChange (editorState) {
		var currentContent = editorState.getCurrentContent();
		var plainText = currentContent.getPlainText();
		var rawContent = convertToRaw(currentContent);
		var description = JSON.stringify(rawContent);
		this.props.descChange(description, plainText);
		this.setState({editorState});
	}

	focus () {
		this.refs.editor.focus();
	} 

	handleKeyCommand (command) {
		var newState = RichUtils.handleKeyCommand(this.state.editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}

		return 'not-handled';
	}

	applyBlockStyle (style) {
		var newState = RichUtils.toggleBlockType(this.state.editorState, style);
		this.onChange(newState);
	}

	render () {
		
		var hashtag = this.props.hashtag;
 		var newState = this.state.editorState;
		var currentContent = this.state.editorState.getCurrentContent();
		var selection = this.state.editorState.getSelection();
		if (selection.getStartOffset() === selection.getEndOffset() && hashtag !== '') {
			var newContentState = Modifier.insertText(currentContent, selection, hashtag);
			var newState = EditorState.push(this.state.editorState, newContentState, 'insert-fragmant');
		}
		
		return (
			<div key={this.props.key}>
				<BlockStyleElements applyBlockStyle={(style) => this.applyBlockStyle(style)}/>
				<div className ="wisdomeditor" onClick = {() => this.focus()}>
					<Editor 
						ref="editor"
						editorState = {newState}
						onChange = {editorState => this.onChange(editorState)}
						handleKeyCommand = {command => this.handleKeyCommand(command)}
					/>
				</div>
			</div>
			);
	}

}

class BlockStyleElements extends Component {
	
	render () {
		var buttons = BLOCK_TYPES.map(type => {
			return <button 
				className="BlockStyleButton"
				onClick = {() => this.props.applyBlockStyle(type.style)}
				>{type.label}</button>
		});	

		return (
			<div className="BlockStyleButtons">
				{buttons}
			</div>
			);
	}

}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

class HashtagSpan extends Component {
	render () {
		return (<span 
					className="hashtagSpan"
					onClick={() => this.props.hashtagClick(this.props.children[0].props.text)}>
					{this.props.children}
					</span>
				);
	}
}


export default WisdomEditor;