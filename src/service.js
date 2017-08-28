import { API_URL } from './constants';
import { callAPI } from './fetch';

export const getWisdom = function (callback, errorCallback) {
	callAPI('GET', API_URL + '/wisdom', data => {
		callback(data);
	}, err => {
		errorCallback(err);
	});
}

export const improveWisdom = function (wisdom) {
	callAPI('POST', API_URL + '/improve');
}

