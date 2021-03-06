import { API_URL } from './constants';
import 'whatwg-fetch';

export const getWisdomService = function (callback, errorCallback) {
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

export const improveWisdomService = function (data, callback, errorCallback) {
	fetch(API_URL+'/edit', {
	  method: 'POST',
	  headers: {
	     'Content-Type': 'application/json'
	   },
	  body: JSON.stringify(data)
	}).then(res => {
	  callback();
	}).catch((err) => {
	  errorCallback(err);
	});
}

export const addWisdomService = function (data, callback, errorCallback) {
	fetch(API_URL+'/add', {
	  method: 'POST',
	  headers: {
	     'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	}).then(res => {
	   res.json().then((result) => {
		callback(result);
	   });
	}).catch(err => {
	   errorCallback(err);
	});
}
