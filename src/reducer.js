export const reducer = function (state, action) {
	switch (action.type) {
		case 'search':
			return {searchStr: action.payload, screen: str === '' ? 'main' : 'browse'}
		case 'openadd':
			var addWisdom = {key: '', title: '', description: ''};
			return {addWisdom: addWisdom, screen: 'add', lookups: []};
		case 'openedit':
			var addWisdom = state.wisdom.filter((item) => {
				return item.key === action.payload;
			})[0];
			return  {addWisdom: addWisdom, screen: 'edit', lookups: []};
		case 'openbrowse':
			return {screen: 'browse'};
		case 'openhome':
			return {screen: 'main', searchStr: ''};
		case 'titlechange':
			var addWisdom = Object.assign({}, this.state.addWisdom, {title: action.payload});
			var lookups = this.findSimilarWisdom(action.payload.trim(), state);
			return {addWisdom: addWisdom, lookups: lookups};
		case 'descchange':
			var addWisdom = Object.assign({}, this.state.addWisdom, {description : action.payload});
			var lookups = this.findSimilarWisdom(action.payload.trim(), state);
			return {addWisdom: addWisdom, lookups: lookups};
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
		default:
			return state;
			break
	} 
}

findSimilarWisdom (value, state) {
	var valueArr = value.split(" ");
	if (value && valueArr.length > 0){
		var lastWord = valueArr[valueArr.length -1].toLowerCase();
		return state.wisdom.filter((item) => {
			return item.title.toLowerCase().indexOf(lastWord) !== -1 || item.description.toLowerCase().indexOf(lastWord) !== -1;
		});
	} else {
		return [];
	}
}