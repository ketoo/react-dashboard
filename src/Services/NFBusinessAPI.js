import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';

export function queryCurrentZone() {

    var url = window.store.host + "/analysis/zone"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setZone(response.data.data);
            console.log("setZone", response.data.data)
        }
  })
  .catch(function (error) {
    console.log(error);
  });

}

export function queryCurrentPlat() {
    var url = window.store.host + "/analysis/plat"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setPlat(response.data.data);
            console.log("setPlat", response.data.data)
        }
  })
  .catch(function (error) {
    console.log(error);
  });


}

export function queryCurrentDailyNewUser() {

    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var dateStr = myDate.getFullYear() + "-" + month + "-" + myDate.getDate();

    queryDailyNewUser(dateStr, "0");
}

export function queryDailyNewUser(time, zoneID) {

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/newuser"
    axios.post(url, {
        date: time,
        day: 15,
        zone: zoneID
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
        window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });

}

export function queryCurrentDailyAvtivelyUser() {

    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var dateStr = myDate.getFullYear() + "-" + month + "-" + myDate.getDate();

    queryDailyAvtivelyUser(dateStr, "0");
}

export function queryDailyAvtivelyUser(time, zoneID) {

    console.log("queryDailyAvtivelyUser", time);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/dailyactivelyuser"
    axios.post(url, {
        date: time,
        day: 15,
        zone: zoneID
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("queryDailyAvtivelyUser", response.data);
        
        {response.data.code === 0 && 
            window.store.setDailyActivelyUserData(response.data);
        }
        window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });
}


export function queryCurrentRetention() {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate() - 1;
    var dateStr = myDate.getFullYear() + "-" + month + "-" + day;

    queryRetention(dateStr, "0");
}

export function queryRetention(time, zoneID) {

    console.log("queryRetention", time);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/retention"
    axios.post(url, {
        date: time,
        day: 15,
        zone: zoneID
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("retention", response.data);
        
        {response.data.code === 0 && 
            window.store.setDailyRetentionData(response.data);
        }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });
}


export function queryCurrentLevel() {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate() - 1;
    var dateStr = myDate.getFullYear() + "-" + month + "-" + day;

    queryLevel(dateStr, "0");
}

export function queryLevel(time, zoneID) {

    console.log("queryLevel", time);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/leveldata"
    axios.post(url, {
        date: time,
        day: 15,
        zone: zoneID
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("retention", response.data);
        
        {response.data.code === 0 && 
            window.store.setLevelData(response.data);
        }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });
}

export function queryCurrentOnlineData() {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate() - 1;
    var dateStr = myDate.getFullYear() + "-" + month + "-" + day;

    queryOnlineData(dateStr, "0");
}

export function queryOnlineData(time, zoneID) {

    console.log("queryLevel", time);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/onlinedata"
    axios.post(url, {
        date: time,
        day: 15,
        zone: zoneID
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("retention", response.data);
        
        {response.data.code === 0 && 
            window.store.setOnlineData(response.data);
        }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });
}