import { observable, observer, computed, action } from "mobx";

class NFMenuModel {
  @observable contentType = 1;

  @computed
  get contentType() {
    return this.contentType;
  }

  @action
  setContentType(type) {
    this.contentType =type;
  }
}

export default new NFMenuModel;
