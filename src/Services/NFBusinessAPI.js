import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';

export function queryCurrentDailyNewUser() {

    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var dateStr = myDate.getFullYear() + "-" + month + "-" + myDate.getDate();

    queryDailyNewUser(dateStr);
}

export function queryDailyNewUser(time) {

    console.log("queryDailyNewUser", time);

    var url = window.store.host + "/analysis/newuser"
    axios.post(url, {
        date: time,
        day: 15
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("queryDailyNewUser", response.data);
        
        {response.data.code === 0 && 
            window.store.setNewUserData(response.data);
        }
  })
  .catch(function (error) {
    console.log(error);
  });
}