export const convertToHashtag = function(value) {
	var array = value.split(" ");
	var hashtag = '#' + array.reduce(function(acc, value){
		var characters = value.split('');
		var camelValue = characters.map(function(char, index){
			return index === 0 ? char.toUpperCase() : char;
		}).join("");
		return  acc + camelValue;
	}, "");

	return hashtag;
}

export const findSimilarWisdom = function (value, state) {
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