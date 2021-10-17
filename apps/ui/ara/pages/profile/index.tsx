import { Content } from '@discover/ui/andromeda';
import {getAuthByContext } from '@discover/ui/next';
import { GetServerSideProps } from 'next';

export default function Profile() {
  return (
    <Content>
      <h1>Profile</h1>
    </Content>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth, redirectToLogin } =getAuthByContext(ctx);
  if (!auth) {
    return redirectToLogin;
  }

  return {
    props: {},
  };
};
