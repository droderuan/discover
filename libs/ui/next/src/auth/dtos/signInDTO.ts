import { Profile } from '@discover/models/veritas';

export default interface SignInDTO {
  access_token: string;
  profile: Profile;
}
