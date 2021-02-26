import { makeAutoObservable } from 'mobx';
import RootStore from '../Root';
import UserStore, { IUser } from '../User';

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
  userStore: UserStore;

  user = null;

  token = null;

  authenticated = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.userStore = rootStore.userStore;
  }

  login = async ({ email, password }: ILogin): Promise<void> => {
    const response = await api.get('/users', {
      params: {
        email,
        password,
      },
    });

    this.userStore.pullUser(response.data[0]);

    this.authenticated = true;
    this.token = response.data[0].token;
  };

  logout = (): void => {
    this.userStore.clearUser();

    this.authenticated = false;
    this.token = null;
  };
}

export default AuthStore;
