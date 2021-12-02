import React from 'react';
import ReactDOM from 'react-dom';

import Test from './test.jsx';

console.log('hello world!');
console.log(Test);

const promise = new Promise((resolve, reject) => {
	resolve(555);
}).then(val => {
	console.log(val);
});

const rofl = [1, 2, 3, 4, 5].map(num => {
	return num + 1;
});

console.log(rofl);

console.log(Test);

ReactDOM.render(<Test />, document.getElementById('reactRoot'));
