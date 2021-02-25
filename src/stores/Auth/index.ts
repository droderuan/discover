import { makeAutoObservable, action } from 'mobx';
import RootStore from '../Root';
import { IUser } from '../User';

import api from '../../services/api';

interface ILogin {
  email: string;
  password: string;
}

interface IAuth {
  user: IUser | null;
  token: string | null;
  authenticated: boolean;
  login: (data: ILogin) => Promise<void>;
  logout: () => void;
}

class AuthStore implements IAuth {
  rootStore: RootStore;

  user = null;

  token = null;

  authenticated = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @action login = async (data: ILogin): Promise<void> => {
    const response = await api.get('/users', {
      params: {
        email: data.email,
        password: data.password,
      },
    });

    const { userStore } = this.rootStore;
    userStore.pullUser(response.data[0]);

    this.authenticated = true;
    this.token = response.data[0].token;

    console.log(this.authenticated);
  };

  @action logout = (): void => {
    const { userStore } = this.rootStore;
    userStore.clearUser();

    this.authenticated = false;
    this.token = null;
  };
}

export default AuthStore;
