import { AxiosInstance } from 'axios';

interface IMeetingDTO {
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

class MeetingClient {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async listAllMeeting(): Promise<IMeetingDTO[]> {
    const response = await this.axios.get('/meetings');

    return response.data as IMeetingDTO[];
  }
}

export default MeetingClient;
