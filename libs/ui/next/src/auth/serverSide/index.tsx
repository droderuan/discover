import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export function getAuthByContext(ctx: GetServerSidePropsContext) {
  const { token } = parseCookies(ctx);
  return {
    auth: !!token,
    redirectToLogin: {
      redirect: {
        destination: `/account/login?redirect_url=${ctx.resolvedUrl}`,
        statusCode: 302 as const,
      },
    },
  };
}
