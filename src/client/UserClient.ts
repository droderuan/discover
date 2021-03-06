import { AxiosInstance } from 'axios';

interface IUserDTO {
  id: string;
  token: string;
  name: string;
  occupation: string;
  email: string;
  profile_url: string;
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

  async findById(id: string): Promise<IUserDTO | void> {
    try {
      const response = await this.axios.get(`/users/${id}`);
      const user = response.data as IUserDTO;

      return user;
    } catch (err) {
      throw new Error('Something went wrong trying to find a user by id');
    }
  }

  async createUser(
    data: Omit<IUserDTO, 'profile_url' | 'token'>,
  ): Promise<void> {
    try {
      await this.axios.post('/users', { ...data });
    } catch (err) {
      throw new Error('Something went wrong trying to create a user');
    }
  }

  async updateUser(data: IUserDTO): Promise<IUserDTO> {
    try {
      const response = await this.axios.put(`/users/${data.id}`, { ...data });
      const updatedUser = response.data as IUserDTO;

      return updatedUser;
    } catch (err) {
      throw new Error('Something went wrong trying to update a user');
    }
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
      throw new Error('Something went wrong trying to find a user by email');
    }
  }
}

export default UserClient;
