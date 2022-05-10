import { NextPageContext } from 'next';

export const redirectURL = {
  'add-reviews': `/profiles/[id]/reviews/add-reviews`,
  'add-sports': `/profiles/[id]/sports/add-sports`,
  'edit-sports': `/profiles/[id]/sports/[sportID]/edit-sports`,
  cockpit: '/cockpit',
};

export const redirectAs = {
  'add-reviews': (query: any) => `/profiles/${query.id}/reviews/add-reviews`,
  'add-sports': (query: any) => `/profiles/${query.id}/sports/add-sports`,
  'edit-sports': (query: any) =>
    `/profiles/${query.id}/sports/${query.sportsID}/edit-sports`,
  cockpit: (_query: any) => '/cockpit',
};

export const getRedirectSettings = (
  query: any
): { url: string; as: string } => {
  // Check for proper redirect Mapping
  if (query && redirectURL[query.action]) {
    return {
      url: redirectURL[query.action],
      as: redirectAs[query.action](query),
    };
  }
  // Check for dirty redirect Mapping
  if (query && query.url && query.as) {
    return {
      url: query.url,
      as: query.as,
    };
  }
  // No redirect to Homepage
  return {
    url: '/',
    as: '/',
  };
};

export const redirectHOC = (ctx: NextPageContext) => {
  // Auth Login Page
  const path = '/auth/login';

  // Get ActionType for ?action=
  const actionType = Object.keys(redirectURL).find(
    (key) => redirectURL[key] === ctx.pathname
  );

  if (ctx.res && actionType) {
    // Set redirect path
    const redirectPath = `${path}?action=${actionType}`;
    const { query } = ctx;
    // Map all existing query params

    const redirectParams = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');

    if (!redirectParams) return `${redirectPath}`;

    return `${redirectPath}&${redirectParams}`;
  }
  // Fallback if not covered to make dirty redirect url
  return `${path}?url=${ctx.pathname}&as=${ctx.asPath}`;
};

//
// Function to redirect and set ?redirect=
//
export const redirectHandler = (ctx: NextPageContext, path: string): void => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: redirectHOC(ctx) });
    ctx.res.end();
  } else {
    window.location.pathname = path;
  }
};
