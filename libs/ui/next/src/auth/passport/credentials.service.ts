import { createApi } from '../../utils/api';
import SignInDTO from '../dtos/signInDTO';
import genericAuthProvider from './genericProvider.interface';

export default {
  execute: async ({ email, password }) => {
    const api = createApi();

    const response = await api.post<SignInDTO>('/genesis/auth/credentials', {
      email,
      password,
    });

    return response.data;
  },
} as genericAuthProvider;
