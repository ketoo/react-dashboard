import { observable, observer, computed, action } from "mobx";

class NFRootModel {
  @observable isLoggedIn = false;

  @computed
  get loginState() {
    return this.isLoggedIn;
  }

  @action
  setLoginState(isLogin) {
    this.isLoggedIn =isLogin;
  }

  @observable contentType = 1;

  @computed
  get getContentType() {
    return this.contentType;
  }

  @action
  setContentType(type) {
    this.contentType =type;
  }
}

export default NFRootModel;
