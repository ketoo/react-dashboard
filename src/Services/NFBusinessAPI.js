import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';
import { Button, Dropdown, Icon, message } from 'antd';

export function queryDailyNewUser(time, platID, zoneID) {

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/newuser"
    axios.post(url, {
        date: time,
        day: 15,
        plat: platID,
        zone: zoneID
    }, {
        headers: {
            'Content-Type': 'application/json',
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
    window.store.isLoading = false;
  });

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
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
    window.store.isLoading = false;
  });
}

export function queryRetention(time, platID, zoneID) {

    console.log("queryRetention", time);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/retention"
    axios.post(url, {
        date: time,
        day: 15,
        plat: platID,
        zone: zoneID
    }, {
        headers: {
            'Content-Type': 'application/json',
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
    window.store.isLoading = false;
  });
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
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
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
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
    window.store.isLoading = false;
  });
}

export function queryItemData(time, zoneID, type, id, reason, subReason, add) {
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
        zone: zoneID,
        type: type,
        id:id,
        reason:reason,
        subReason:subReason,
        add:add
    }, {
        headers: {
            'Content-Type': 'application/json',
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
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
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
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
            'UserID': window.store.userID,
            'Token': window.store.jwt
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
    message.error(error);
    
    window.store.isLoading = false;
  });
}

export function queryRoundData(time, type, id) {
    console.log("queryRoundData time", time);
    console.log("queryRoundData type", type);

    window.store.isLoading = true;

    var url = window.store.host + "/analysis/rounddata"
    axios.post(url, {
        date: time,
        day: 15,
        type: type,
        id: id
    }, {
        headers: {
            'Content-Type': 'application/json',
            'UserID': window.store.userID,
            'Token': window.store.jwt
        }
    })
    .then(function (response) {
        console.log("queryRoundData res", response.data.roundData);
        
        {response.data.code === 0 && 
            window.store.setRoundData(response.data.roundData);
        }

      window.store.isLoading = false;
  })
  .catch(function (error) {
    message.error(error);
    window.store.isLoading = false;
  });
}