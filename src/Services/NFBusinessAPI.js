import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';

export function queryDailyNewUser(time) {

  axios.post('http://leetframe.com::5000/analysis/newuser', {
    date: time,
    day: 15
  }, {
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then(function (response) {
    console.log(response.data);
    
    {response.data.code === 0 && 
        {
        }
    }
    
    //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  })
  .catch(function (error) {
    console.log(error);
  });
}