import { AlertDialog, Content } from '@discover/ui/andromeda';
import { useAuth } from '@discover/ui/next';

export function Index() {
  const {
    profile,
    isAuthenticated,
    profileIsLoading,
    signIn,
    signOut,
    serverError,
  } = useAuth();
  return (
    <Content>
      <AlertDialog
        open={serverError}
        title="Ouch!"
        message="Looks like we are facing issues. Refresh or try again later."
      />
      <h1>Home</h1>
      {isAuthenticated ? (
        profileIsLoading ? (
          <h4>loading...</h4>
        ) : (
          <>
            <h1>{profile.name}</h1>
            <button onClick={() => signOut()}>signOut</button>
          </>
        )
      ) : (
        <button onClick={() => signIn()}>login</button>
      )}
    </Content>
  );
}

export default Index;
