import { Content } from '@discover/ui/andromeda';
import { useAuth } from '@discover/ui/next';

export function Index() {
  const { profile, isAuthenticated, profileIsLoading, signIn, signOut } =
    useAuth();
  return (
    <Content>
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
