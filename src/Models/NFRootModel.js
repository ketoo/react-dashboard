import { observable, observer, computed, action } from "mobx";

class NFRootModel {
  @observable isLoggedIn;

  @computed
  get LoginState() {
    return this.isLoggedIn;
  }

  @action
  setLoginState(isLogin) {
    this.isLoggedIn =isLogin;
  }
}

export default NFRootModel;
