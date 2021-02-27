import { AxiosInstance } from 'axios';

interface IUserDTO {
  id: string;
  token: string;
  name: string;
  occupation: string;
  email: string;
}

interface IVerifyUser {
  email: string;
  password: string;
}

class UserClient {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async createUser(data: Omit<IUserDTO, 'token'>): Promise<void> {
    try {
      await this.axios.post('/users', { ...data });
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }

  async updateUser(data: IUserDTO): Promise<IUserDTO> {
    const response = await this.axios.put(`/users/${data.id}`, { ...data });
    const updatedUser = response.data as IUserDTO;

    return updatedUser;
  }

  async verifyUser(data: IVerifyUser): Promise<IUserDTO | false> {
    try {
      const response = await this.axios.get('/users', {
        params: {
          email: data.email,
          password: data.password,
        },
      });

      return response.data[0] as IUserDTO;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
}

export default UserClient;
