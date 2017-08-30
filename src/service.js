import { API_URL } from './constants';
import 'whatwg-fetch';

export const getWisdom = function (callback, errorCallback) {
	fetch(API_URL+'/wisdom')
	 .then(res => {
	   res.json().then((data) => {
		callback(data);
	   });
	 })
	 .catch(err => {
	   errorCallback(err);
	 });
}

export const improveWisdom = function (wisdom) {
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
