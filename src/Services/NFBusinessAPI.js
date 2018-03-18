import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';

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

export function queryRetention(time, platID) {

    console.log("queryRetention", time);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/retention"
    axios.post(url, {
        date: time,
        day: 15,
        zone: platID
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("queryRetention", response.data);
        
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
        console.log("queryLevel", response.data);
        
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
    var day = myDate.getDate();
    var dateStr = myDate.getFullYear() + "-" + month + "-" + day;

    queryOnlineData(dateStr, "0");
}

export function queryOnlineData(time, zoneID) {

    console.log("queryOnlineData", time);

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
        console.log("queryOnlineData", response.data);
        
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

export function queryItemData(time, type, id, reason, subReason, add) {
    console.log("queryItemData time", time);
    console.log("queryItemData type", type);
    console.log("queryItemData id", id);
    console.log("queryItemData reason", reason);
    console.log("queryItemData subReason", subReason);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/itemdata"
    axios.post(url, {
        date: time,
        day: 15,
        type: type,
        id:id,
        reason:reason,
        subReason:subReason,
        add:add
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("queryItemData", response.data);
        
        {response.data.code === 0 && 
            window.store.setItemData(response.data.itemData);
        }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });
}


export function queryTaskData(time, type, id, add) {
    console.log("queryTaskData time", time);
    console.log("queryTaskData type", type);
    console.log("queryTaskData id", id);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/taskdata"
    axios.post(url, {
        date: time,
        day: 15,
        type: type,
        id:id,
        add:add
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("queryTaskData", response.data);
        
        {response.data.code === 0 && 
            window.store.setTaskData(response.data.taskData);
        }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });
}

export function queryActivityData(time, type) {
    console.log("queryActivityData time", time);
    console.log("queryActivityData type", type);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/activitydata"
    axios.post(url, {
        date: time,
        day: 15,
        type: type,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        console.log("queryActivityData", response.data);
        
        {response.data.code === 0 && 
            window.store.setActivityData(response.data.activityData);
        }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    console.log(error);
    window.store.isLoading = false;
  });
}