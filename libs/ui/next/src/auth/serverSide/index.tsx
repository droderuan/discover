import { GetServerSidePropsContext, GetStaticPropsResult } from 'next';
import { parseCookies } from 'nookies';

export function isAuthenticatedServer(ctx: GetServerSidePropsContext) {
  const { token } = parseCookies(ctx);
  return {
    auth: !!token,
    returnValue: {
      redirect: {
        destination: `/account/login?redirect_url=${ctx.resolvedUrl}`,
        statusCode: 302 as const,
      },
    },
  };
}
