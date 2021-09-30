import { throwError } from 'rxjs';
import SignInDTO from '../dtos/signInDTO';
import credentialsAuthprovider from '../passport/credentials.service';
import googleAuthprovider from '../passport/google.service';

interface credentialsSignIn {
  provider: 'credentials';
  email: string;
  password: string;
}

interface socialSignIn {
  provider: 'google';
}

export type AuthOptions = credentialsSignIn | socialSignIn;

export function auth(
  options: credentialsSignIn | socialSignIn
): Promise<SignInDTO> {
  switch (options.provider) {
    case 'credentials':
      return credentialsAuthprovider.execute({
        email: options.email,
        password: options.password,
      });
    case 'google':
      return googleAuthprovider.execute();
    default:
      throw throwError('provider does not exist');
  }
}
