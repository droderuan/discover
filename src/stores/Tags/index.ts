import { makeAutoObservable } from 'mobx';

interface ITag {
  name: '';
}

class TagsStore {
  tags: ITag[];

  constructor() {
    makeAutoObservable(this);
    this.tags = [] as ITag[];
  }
}
