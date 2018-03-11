import { observable, observer, computed, action } from "mobx";

class NFRootModel {

  @observable host = "http://127.0.0.1:5000";
  @observable host_dev = "http://127.0.0.1:5000";
  @observable host_pro = "http://leetframe.com:5000";

  @observable isLoggedIn = false;
  @observable contentType = 0;

  @observable newUserData;
  @observable dailyActivelyUserData;
  @observable dailyRetentionData;

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


}

export default NFRootModel;
