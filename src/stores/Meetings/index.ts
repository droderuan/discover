import { makeAutoObservable } from 'mobx';

export interface IMeeting {
  title: string;
  description: string;
  tags: { name: string }[];
  user: {
    name: string;
    occupation: string;
    profile_url: string;
  };
  platform: {
    name: string;
    icon: string;
  };
  date: {
    full_date: string;
  };
}

export default class Mettings implements IMeeting {
  title = '';

  description = '';

  tags: { name: string }[] = [];

  user = {
    name: '',
    occupation: '',
    profile_url: '',
  };

  platform = {
    name: '',
    icon: '',
  };

  date = {
    full_date: '',
  };

  constructor({ title, description, tags, user, platform, date }: IMeeting) {
    makeAutoObservable(this, {
      title: false,
      description: false,
      tags: false,
      user: false,
      platform: false,
      date: false,
    });

    this.title = title;
    this.description = description;
    this.tags = tags;
    this.user = user;
    this.platform = platform;
    this.date = date;
  }
}
