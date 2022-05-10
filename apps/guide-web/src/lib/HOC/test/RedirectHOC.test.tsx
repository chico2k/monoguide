import {
  redirectAs,
  getRedirectSettings,
  redirectHOC,
  redirectHandler,
} from '../redirectHOC';

delete global.window.location;
global.window = Object.create(window);
global.window.location = {} as any;

describe('Redirect Handler', () => {
  test('should return correct redirect as', () => {
    const query = { id: 1, sportsID: 2 };

    expect(redirectAs['add-reviews'](query)).toBe(
      `/profiles/${query.id}/reviews/add-reviews`
    );
    expect(redirectAs['add-sports'](query)).toBe(
      `/profiles/${query.id}/sports/add-sports`
    );
    expect(redirectAs['edit-sports'](query)).toBe(
      `/profiles/${query.id}/sports/${query.sportsID}/edit-sports`
    );
    expect(redirectAs['cockpit'](query)).toBe('/cockpit');
  });

  test('should getRedirectSettings', async () => {
    const query = {
      action: 'add-reviews',
      id: 1,
    };
    expect(getRedirectSettings(query)).toStrictEqual({
      url: `/profiles/[id]/reviews/add-reviews`,
      as: `/profiles/1/reviews/add-reviews`,
    });

    const query2 = {
      url: '/url',
      as: 'as-something',
    };
    expect(getRedirectSettings(query2)).toStrictEqual({
      url: query2.url,
      as: query2.as,
    });

    const query3 = {};
    expect(getRedirectSettings(query3)).toStrictEqual({
      url: '/',
      as: '/',
    });
  });

  test('should redirectHOC with params', () => {
    const ctx = {
      pathname: '/profiles/[id]/reviews/add-reviews',
      res: { response: 'object' },
      query: {
        sportId: 1,
        id: 2,
      },
      AppTree: {},
    };
    const expected = redirectHOC(ctx as any);
    expect(expected).toBe('/auth/login?action=add-reviews&sportId=1&id=2');
  });

  test('should redirectHOC without params', () => {
    const ctx = {
      pathname: '/profiles/[id]/reviews/add-reviews',
      res: { response: 'object' },
      query: {},
      AppTree: {},
    };
    const expected = redirectHOC(ctx as any);
    expect(expected).toBe('/auth/login?action=add-reviews');
  });

  test('should redirectHOC fallback', () => {
    const ctx = {
      pathname: '/not-mapped',
      asPath: '/not-mapped',
      res: { response: 'object' },
      query: {},
      AppTree: {},
    };
    const expected = redirectHOC(ctx as any);
    expect(expected).toBe('/auth/login?url=/not-mapped&as=/not-mapped');
  });

  test('should redirectHandler server side', () => {
    const writeHead = jest.fn();
    const end = jest.fn();
    const ctx = {
      pathname: '/profiles/[id]/reviews/add-reviews',
      res: { response: 'object', writeHead, end },
      query: {
        sportId: 1,
        id: 2,
      },
      AppTree: {},
    };

    const spy = jest.spyOn(ctx.res, 'writeHead');

    redirectHandler(ctx as any, '/auth/login');
    expect(spy).toBeCalledWith(302, {
      'Location': '/auth/login?action=add-reviews&sportId=1&id=2',
    });
  });

  test('should redirectHandler client side', () => {
    const ctx = {};

    const path = '/auth/login';
    redirectHandler(ctx as any, path);
    expect(window.location.pathname).toBe(path);
  });
});
