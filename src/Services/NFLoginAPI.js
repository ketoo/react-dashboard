import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';
import {queryDailyNewUser, queryCurrentDailyNewUser} from '../Services/NFBusinessAPI';


export function login(userName, password) {

  var url = window.store.host + "/user/login"

    console.log(userName, password);
    console.log("url", url);

    axios.post(url, {
      user: userName,
      password: password
    }, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (response) {
      console.log(response.data);
      
      {response.data.code === 0 && 
        window.store.setLoginState(true);
        
        queryCurrentDailyNewUser();
      }

    //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  })
  .catch(function (error) {
    console.log(error);
  });
}