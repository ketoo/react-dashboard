import { observable, observer, computed, action } from "mobx";

class NFRootModel {

  @observable host;
  @observable host_dev = "http://127.0.0.1:5000";
  @observable host_pro = "http://leetframe.com:5000";


  @observable isLoggedIn = false;
  @observable userID;
  @observable jwt;
  @observable contentType = 0;
  @observable isLoading = false;

  @observable zone;
  @observable plat;

  @observable onlineData;
  @observable newUserData;
  @observable dailyActivelyUserData;
  @observable dailyRetentionData;
  @observable levelData;
  

  @action
  clearAllData() {
    this.isLoggedIn = false;
    this.userID = "";
    this.jwt = "";
    this.contentType = 0;
    this.isLoading = false;
  
    this.newUserData = null;
    this.dailyActivelyUserData = null;
    this.dailyRetentionData = null;
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
  get getNewUserData() {
    return this.newUserData;
  }

  @action
  setNewUserData(data) {
    this.newUserData =data;
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
    this.onlineData =data;
  }

}
export default NFRootModel;
