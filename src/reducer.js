import { convertToHashtag, findSimilarWisdom } from './Utilities';

export const reducer = function (state, action) {
	switch (action.type) {
		case 'search':
			return {searchStr: action.payload, screen: action.payload === '' ? 'main' : 'browse'}
		case 'openadd':
			var addWisdom = {key: '', title: '', description: ''};
			return {addWisdom: addWisdom, screen: 'add', lookups: []};
		case 'openedit':
			var addWisdom = state.wisdom.filter((item) => {
				return item.key === action.payload;
			})[0];
			return  {addWisdom: addWisdom, screen: 'edit', lookups: [], history: getNewHistory(state)};
		case 'openbrowse':
			return {screen: 'browse'};
		case 'openhome':
			return {screen: 'main', searchStr: '', history: []};
		case 'titlechange':
			var addWisdom = Object.assign({}, state.addWisdom, {title: action.payload});
			var lookups = findSimilarWisdom(action.payload.trim(), state);
			return {addWisdom: addWisdom, lookups: lookups, hashtag: ''};
		case 'descchange':
			var addWisdom = Object.assign({}, state.addWisdom, {description : action.payload.description});
			var lookups = findSimilarWisdom(action.payload.plainText.trim(), state);
			return {addWisdom: addWisdom, lookups: lookups, hashtag: ''};
		case 'addedWisdom':
			var key = action.payload;
			var addWisdom = state.addWisdom;
			var newWisdom = state.wisdom.slice();
	 		newWisdom.push({title: addWisdom.title, description: addWisdom.description, key: key});
	 		return {wisdom: newWisdom, addWisdom: {title: '', description: ''}, screen: 'browse'};
		case 'editedWisdom':
			var addWisdom = state.addWisdom;
			var newWisdom = state.wisdom.map((item) => {
                return item.key === state.addWisdom.key ? Object.assign({}, item, {title: addWisdom.title, description: addWisdom.description}) : item;
            });
            return {wisdom: newWisdom, addWisdom: {title: '', description: ''}, screen: 'browse'};
		case 'gotWisdom':
			var wisdom = action.payload.map(item => {
				return { key: item._id, title: item.title, description: item.description };
			});

			return {wisdom: wisdom};
		case 'hashtagclick':
			var itemToEdit = state.wisdom.filter(item => {
  				return convertToHashtag(item.title) === action.payload;
  			})[0];
  	
  			return (itemToEdit && itemToEdit.key) ? {addWisdom: itemToEdit, screen: 'edit', lookups: [], history: getNewHistory(state)} : state;
	   	case 'insertlink':
	   		return {hashtag: action.payload};
	   	case 'back':
	   		var history = state.history;
	   		if (history.length > 0){
	   			var lastState = history[history.length - 1];
	   			return Object.assign({}, lastState);
	   		} else {
	   			return state;
	   		}
	   		
		default:
			return state;
			break
	} 
}

function getNewHistory (state) {
	var prevState = Object.assign({}, state);
	var history = state.history.slice();
	history.push(prevState);

	return history;
}

