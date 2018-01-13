import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NFRootModel from './Models/NFRootModel';


const store = new NFRootModel();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();

// playing around in the console
window.store = store;