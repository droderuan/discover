import { Content } from '@discover/ui/andromeda';
import { useAuth } from '@discover/ui/next';

export function Index() {
  const { profile, isAuthenticated, signIn, signOut } = useAuth();

  return (
    <Content>
      <div
        style={{
          width: '100%',
          flexDirection: 'column',
          height: '100%',
          background: '#204090',
        }}
      >
        <div
          style={{
            background: '#ff9090',
            height: 80,
            flex: 1,
            flexShrink: 1,
            minWidth: 160,
          }}
        >
          1
        </div>
        <h1>{isAuthenticated && profile.name}</h1>
        {isAuthenticated ? (
          <button onClick={() => signOut()}>signOut</button>
        ) : (
          <button onClick={() => signIn()}>login</button>
        )}
      </div>
    </Content>
  );
}

export default Index;
