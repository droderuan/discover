import { makeAutoObservable } from 'mobx';

export interface IUser {
  id: string;
  name: string;
  occupation: string;
  email: string;
  profile_url: string;
}

export default class UserStore implements IUser {
  id = '';

  name = '';

  occupation = '';

  email = '';

  profile_url = '';

  constructor() {
    makeAutoObservable(this);
  }

  pullUser = (user: IUser): void => {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.occupation = user.occupation;
    this.profile_url = user.profile_url;
  };

  clearUser = (): void => {
    this.id = '';
    this.name = '';
    this.email = '';
    this.occupation = '';
  };
}
