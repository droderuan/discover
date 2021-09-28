import { Profile } from '@discover/models-veritas';

export interface UserloginDTO {
  access_token: string;
  user: Profile;
}
