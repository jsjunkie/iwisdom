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