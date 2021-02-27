import axios from 'axios';

import UserClient from './UserClient';
import MeetingClient from './MeetingClient';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

class Client {
  static userClient = new UserClient(api);

  static meetingClient = new MeetingClient(api);
}

export default Client;
