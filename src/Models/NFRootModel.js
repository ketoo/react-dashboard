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
}

export default NFRootModel;
