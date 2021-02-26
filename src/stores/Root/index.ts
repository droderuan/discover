import AuthStore from '../Auth';
import UserStore from '../User';

class RootStore {
  authStore: AuthStore;

  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore(this);
  }
}

export default RootStore;
