import { makeAutoObservable } from 'mobx';

export interface IUser {
  id: string;
  name: string;
  occupation: string;
  email: string;
}

export default class UserStore implements IUser {
  id = '';

  name = '';

  occupation = '';

  email = '';

  constructor() {
    makeAutoObservable(this);
  }

  pullUser = (user: IUser): void => {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.occupation = user.occupation;
  };

  clearUser = (): void => {
    this.id = '';
    this.name = '';
    this.email = '';
    this.occupation = '';
  };
}
