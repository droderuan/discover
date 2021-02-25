import AuthStore from '../Auth';
import UserStore from '../User';

class RootStore {
  authStore: AuthStore;

  userStore: UserStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
  }
}

export default RootStore;
