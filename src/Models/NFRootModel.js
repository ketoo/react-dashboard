import { observable, observer, computed, action } from "mobx";

class NFRootModel {

  @observable host;
  @observable host_dev = "http://leetframe.com:5000";
  //@observable host_dev = "http://leetframe.com:5000";
  @observable host_pro = "http://leetframe.com:5000";


  @observable isLoggedIn = false;
  @observable userID;
  @observable jwt;
  @observable contentType = 0;
  @observable isLoading = false;

  @observable zone;
  @observable source;
  @observable itemIDList;
  @observable itemTypeList;
  @observable reasonList;
  @observable subReasonList;
  @observable activityTypeList;
  @observable taskTypeList;
  @observable taskIDList;
  @observable roundTypeList;
  @observable roundIDList;

  @observable onlineData;
  @observable newUserZoneData;
  @observable newUserPlatData;
  @observable newUserSourceData;
  @observable dailyActivelyUserData;
  @observable dailyRetentionData;
  @observable levelData;
  @observable itemData;
  @observable taskData;
  @observable activityData;
  @observable roundData;
  


  @action
  clearViewData() {
    this.onlineData = null;
    this.newUserZoneData = null;
    this.newUserPlatData = null;
    this.newUserSourceData = null;
    this.dailyActivelyUserData = null;
    this.dailyRetentionData = null;
    this.levelData = null;
    this.itemData = null;
    this.taskData = null;
    this.activityData = null;
    this.roundData = null;

  }

  @action
  clearAllData() {
    this.isLoggedIn = false;
    this.userID = "";
    this.jwt = "";
    this.contentType = 0;
    this.isLoading = false;
  
    this.onlineData = null;
    this.newUserZoneData = null;
    this.newUserPlatData = null;
    this.newUserSourceData = null;
    this.dailyActivelyUserData = null;
    this.dailyRetentionData = null;
    this.levelData = null;
    this.itemData = null;
    this.taskData = null;
    this.activityData = null;
    this.roundData = null;
  }

  @action
  setPlat(data) {
    this.plat =data;
  }


  @action
  setZone(data) {
    this.zone =data;
  }
  @action
  setProdEvn(b) {
    if (b)
    {
      this.host = this.host_pro;
    }
    else
    {
      this.host = this.host_dev;
    }
  }

  @computed
  get loginState() {
    return this.isLoggedIn;
  }

  @action
  setLoginState(isLogin) {
    this.isLoggedIn =isLogin;
  }

  @computed
  get getContentType() {
    return this.contentType;
  }

  @action
  setContentType(type) {
    this.contentType =type;
  }


  @computed
  get getItemIDList() {
    return this.itemIDList;
  }

  @action
  setItemIDList(data) {
    this.itemIDList =data;
  }

  @computed
  get getItemTypeList() {
    return this.itemTypeList;
  }

  @action
  setItemTypeList(data) {
    this.itemTypeList =data;
  }

  @computed
  get getReasonList() {
    return this.reasonList;
  }

  @action
  setReasonList(data) {
    this.reasonList =data;
  }

  @computed
  get getSubReasonList() {
    return this.subReasonList;
  }

  @action
  setSubReasonList(data) {
    this.subReasonList =data;
  }

  @computed
  get getActivityTypeList() {
    return this.activityTypeList;
  }

  @action
  setActivityTypeList(data) {
    this.activityTypeList =data;
  }

  @action
  setTaskTypeList(data) {
    this.taskTypeList =data;
  }
  @action
  setTaskIDList(data) {
    this.taskIDList =data;
  }

  @action
  setRoundTypeList(data) {
    this.roundTypeList =data;
  }

  @action
  setRoundIDList(data) {
    this.roundIDList =data;
  }

  @action
  setSourceList(data) {
    this.source =data;
  }

  @computed
  get getNewUserZoneData() {
    return this.newUserZoneData;
  }

  @action
  setNewUserZoneData(data) {
    this.newUserZoneData =data;
  }

  @computed
  get getDailyActivelyUserData() {
    return this.dailyActivelyUserData;
  }

  @action
  setDailyActivelyUserData(data) {
    this.dailyActivelyUserData =data;
  }

  @computed
  get getDailyRetentionData() {
    return this.dailyRetentionData;
  }

  @action
  setDailyRetentionData(data) {
    this.dailyRetentionData =data;
  }

  @action
  setLevelData(data) {
    this.levelData =data;
  }

  @action
  setOnlineData(data) {

    console.log(this.onlineData)
    this.onlineData =data;

    console.log(this.onlineData)
  }

  @action
  setItemData(data) {
    this.itemData =data;
  }

  @action
  setTaskData(data) {
    this.taskData =data;
  }

  @action
  setActivityData(data) {
    this.activityData =data;
  }

  @action
  setRoundData(data) {
    this.roundData =data;
  }
  
  @action
  setNewUserPlatData(data) {
    this.newUserPlatData =data;
  }

  @action
  setNewUserSourceData(data) {
    this.newUserSourceData =data;
  }
}
export default NFRootModel;