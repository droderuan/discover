import { createApi } from '../../utils/api';
import SignInDTO from '../dtos/signInDTO';
import genericAuthProvider from './genericProvider.interface';

export default {
  execute: async () => {
    const api = createApi();

    const response = await api.post<SignInDTO>('/genesis/auth/credentials');

    return response.data;
  },
} as genericAuthProvider;
