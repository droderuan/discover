import { Profile } from '@discover/models/veritas';
import { AxiosInstance } from 'axios';

export async function getProfile(api: AxiosInstance) {
  const { data } = await api.get<Profile>('/genesis/profile');

  return data;
}
