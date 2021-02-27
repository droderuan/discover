import { makeAutoObservable } from 'mobx';
import RootStore from '../Root';
import UserStore, { IUser } from '../User';

import Client from '../../client/Client';

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

  token: string | null = null;

  authenticated = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.userStore = rootStore.userStore;
  }

  login = async ({ email, password }: ILogin): Promise<void> => {
    const { userClient } = Client;
    const user = await userClient.verifyUser({ email, password });

    if (user) {
      this.userStore.pullUser(user);

      this.authenticated = true;
      this.token = user.token;
    } else {
      throw new Error('User was not found');
    }
  };

  logout = (): void => {
    this.userStore.clearUser();

    this.authenticated = false;
    this.token = null;
  };
}

export default AuthStore;
