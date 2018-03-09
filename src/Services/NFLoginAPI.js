import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';

export function login(userName, password) {

  axios.post('https://api-staging.latipay.net/org/account/login', {
    email: userName,
    password: password
  }, {
    headers: {'X-Custom-Header': 'foobar'}
  })
  .then(function (response) {
    console.log(response.data);
    
    {response.data.code == 0 && 
      window.store.setLoginState(true);
    }
    
    //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  })
  .catch(function (error) {
    console.log(error);
  });
}