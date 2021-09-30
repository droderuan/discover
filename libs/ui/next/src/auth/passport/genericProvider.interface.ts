import SignInDTO from '../dtos/signInDTO';

export interface CredentialsSignInParams {
  email: string;
  password: string;
}

export default interface authProvider {
  execute(): Promise<SignInDTO>;
  execute(params: CredentialsSignInParams): Promise<SignInDTO>;
}
