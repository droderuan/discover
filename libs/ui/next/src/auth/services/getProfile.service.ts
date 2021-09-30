import { Profile } from '@discover/models/veritas';
import { createApi } from '../../utils';

export async function getProfile(token: string) {
  const api = createApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = await api.get<Profile>('/genesis/profile');

  return data;
}
