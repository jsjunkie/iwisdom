import { API_URL } from './constants';
import { callAPI } from './fetch';
import 'whatwg-fetch';

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

export const addWisdomService = function (data, callback, errorCallback) {
	fetch(API_URL+'/add', {
	  method: 'POST',
	  headers: {
	     'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	}).then(res => {
	   callback(res);
	}).catch(err => {
	   errorCallback(err);
	});
}
