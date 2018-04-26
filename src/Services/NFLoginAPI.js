import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';
import {queryCurrentOnlineData} from '../Services/NFBusinessAPI';
import {queryCurrentZone, queryCurrentPlat} from '../Services/NFGlobalAPI';
import {queryItemTypeList, queryItemIDList, queryReasonList, querySubReasonList, queryActivityTypeList, querySourceList} from '../Services/NFGlobalAPI';
import {queryTaskIDList, queryTaskTypeList} from '../Services/NFGlobalAPI';
import {queryRoundIDList, queryRoundTypeList} from '../Services/NFGlobalAPI';
import { message, Button } from 'antd'

export function login(userName, password) {

    window.store.isLoading = true;

    if (process.env.NODE_ENV === "development")
    {
      window.store.setProdEvn(false);
    }
    else
    {
      window.store.setProdEvn(true);
    }

    var url = window.store.host + "/user/login"
    console.log(userName, password);
    console.log("url", url);
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);


    axios.post(url, {
      user: userName,
      password: password
    }, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (response) {
      console.log(response.data);
      
      if (response.data.code == 0)
      {
        window.store.setLoginState(true);
        window.store.userID = response.data.userID;
        window.store.jwt = response.data.jwt;

        queryCurrentZone();
  
        queryItemTypeList();
        queryItemIDList();
        queryReasonList();
        querySubReasonList();
        queryActivityTypeList();
        queryTaskIDList();
        queryTaskTypeList();
        queryRoundIDList();
        queryRoundTypeList();
        querySourceList();
  
        queryCurrentOnlineData();
      }
      else
      {
        message.error("Login fail.... error code: " + response.data.code);
      }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    message.error("Cannot connect to the server");
    window.store.isLoading = false;
  });

}