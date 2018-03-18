import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import NFRootModel from '../Models/NFRootModel';
import { Button, Dropdown, Icon, message } from 'antd';

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
    message.error(error);
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
    message.error(error);
  });

}

export function queryItemTypeList() {
    var url = window.store.host + "/analysis/itemtypelist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setItemTypeList(response.data.data);
            console.log("setItemTypeList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}

export function queryItemIDList() {
    var url = window.store.host + "/analysis/itemidlist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setItemIDList(response.data.data);
            console.log("setItemIDList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}

export function queryReasonList() {
    var url = window.store.host + "/analysis/reasonlist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setReasonList(response.data.data);
            console.log("setReasonList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}

export function querySubReasonList() {
    var url = window.store.host + "/analysis/subreasonlist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setSubReasonList(response.data.data);
            console.log("setSubReasonList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}


export function queryActivityTypeList() {
    var url = window.store.host + "/analysis/activitytypelist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setActivityTypeList(response.data.data);
            console.log("setActivityTypeList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}


export function queryTaskTypeList() {
    var url = window.store.host + "/analysis/tasktypelist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setTaskTypeList(response.data.data);
            console.log("setTaskTypeList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}

export function queryTaskIDList() {
    var url = window.store.host + "/analysis/taskidlist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setTaskIDList(response.data.data);
            console.log("setTaskIDList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}


export function queryRoundTypeList() {
    var url = window.store.host + "/analysis/roundtypelist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setRoundTypeList(response.data.data);
            console.log("setRoundTypeList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}

export function queryRoundIDList() {
    var url = window.store.host + "/analysis/roundidlist"
    axios.post(url, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
        {response.data.code === 0 && 
            window.store.setRoundIDList(response.data.data);
            console.log("setRoundIDList", response.data.data)
        }
  })
  .catch(function (error) {
    message.error(error);
  });

}
