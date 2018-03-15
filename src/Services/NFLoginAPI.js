import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';
import {queryDailyNewUser, queryCurrentDailyNewUser, queryCurrentZone, queryCurrentPlat} from '../Services/NFBusinessAPI';
import { message, Button } from 'antd'

export function login(userName, password) {

    window.store.isLoading = true;

    if (process.env.NODE_ENV === "development")
    {
      window.store.setProdEvn(false);

      window.store.setLoginState(true);
      window.store.isLoading = false;
    }
    else
    {
      window.store.setProdEvn(true);
    }

    var url = window.store.host + "/user/login"
    console.log(userName, password);
    console.log("url", url);
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);

    queryCurrentZone();
    queryCurrentPlat();

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
        window.store.userID = response.data.userID;
        window.store.jwt = response.data.jwt;


        queryCurrentDailyNewUser();
      }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log("error1", error);

    message.error("Cannot connect to the server");
    window.store.isLoading = false;
  });


}