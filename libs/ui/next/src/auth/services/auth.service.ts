import { throwError } from 'rxjs';
import SignInDTO from '../dtos/signInDTO';
import credentialsAuthprovider from '../passport/credentials.service';
import googleAuthprovider from '../passport/google.service';
import authProvider from '../passport/genericProvider.interface';

interface credentialsSignIn {
  provider: 'credentials';
  email: string;
  password: string;
}

interface socialSignIn {
  provider: 'google';
}

export type AuthOptions = credentialsSignIn | socialSignIn;

const providers: Record<AuthOptions['provider'], authProvider> = {
  credentials: credentialsAuthprovider,
  google: googleAuthprovider,
};

export function auth(
  options: credentialsSignIn | socialSignIn
): Promise<SignInDTO> {
  switch (options.provider) {
    case 'credentials':
      return providers.credentials.execute({
        email: options.email,
        password: options.password,
      });
    case 'google':
      return providers.google.execute();
    default:
      throw throwError('Provider does not exist');
  }
}
