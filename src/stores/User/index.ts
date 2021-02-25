import { action, makeAutoObservable } from 'mobx';
import RootStore from '../Root';

export interface IUser {
  id: string;
  name: string;
  occupation: string;
  email: string;
}

export default class UserStore implements IUser {
  rootStore: RootStore;

  id = '';

  name = '';

  occupation = '';

  email = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @action pullUser = (user: IUser): void => {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.occupation = user.occupation;
  };

  @action clearUser = (): void => {
    this.id = '';
    this.name = '';
    this.email = '';
    this.occupation = '';
  };
}
