import EditSportForm, { IProps } from '../index';
import { mountWithTheme, waitForComponentToPaint } from '../../../../../../../lib/jest';
import {
  UpdateSportDocument,
  GetUserDetailDocument,
  GetUserDetailQuery,
  User,
} from '../../../../../../../generated/graphql';
import { getTestUser, getTestSports } from '../../../../../../../lib/jest/data/user';
import { InMemoryCache } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import * as error from '../../../../../../../lib/helpers/errorHandler';

describe('Name of the group', () => {
  let tree: any;
  let wrapper: any;
  let mutationCalled: boolean;
  let props = {} as IProps;
  let cache: InMemoryCache;
  const sportId = 1;
  const currentLevel = 1;
  const newLevel = 3;
  let user: User;

  beforeEach(() => {
    const sports = [getTestSports({ level: currentLevel, id: 1 }, { id: 1 }), getTestSports({ level: 2 }, { id: 2 })];

    user = getTestUser(null, {
      sport: sports,
    });

    props = {
      sportId: sportId,
      level: currentLevel,
      profileId: user.profile.id,
    };

    cache = new InMemoryCache();

    tree = <EditSportForm {...props} />;

    wrapper = mountWithTheme(tree);
  });

  afterEach(() => {
    cache.reset();
  });

  test('should render correctly', () => {
    const form = wrapper.find('form').first();
    expect(form.length).toBe(1);

    const input = wrapper.find('SelectInput');
    expect(input.length).toBe(1);
  });

  test('should submit correctly', async () => {
    const mocks = [
      {
        request: {
          query: UpdateSportDocument,
          variables: {
            sportId: sportId,
            level: newLevel,
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              updateSport: true,
            },
          };
        },
      },

      {
        request: {
          query: GetUserDetailDocument,
          variables: { profileId: user.profile.id },
        },
        result: () => {
          return {
            data: {
              getUserDetail: {
                user,
              },
            },
          };
        },
      },
    ];

    cache.writeQuery({
      query: GetUserDetailDocument,
      variables: { profileId: user.profile.id },
      data: {
        getUserDetail: {
          __typename: 'getUserDetail',
          user,
          myProfile: true,
          id: user.id,
        },
      },
    });
    wrapper = mountWithTheme(tree, mocks, cache);

    act(() => {
      wrapper.find('Select').instance().selectOption({ value: newLevel });
    });

    await waitForComponentToPaint(wrapper, 90);

    const form = wrapper.find('form');

    form.first().simulate('submit');
    await waitForComponentToPaint(wrapper, 90);

    const sportFromCache = cache.readQuery<GetUserDetailQuery>({
      query: GetUserDetailDocument,
      variables: { profileId: user.profile.id },
    }).getUserDetail.user.profile.sport;

    const updatedSport = sportFromCache.find((sports) => {
      if (sports.id === +sportId) return sports;
    });

    expect(updatedSport.level).toBe(newLevel);
    expect(mutationCalled).toBe(true);
  });

  test('should submit correctly', async () => {
    const mocks = [
      {
        request: {
          query: UpdateSportDocument,
          variables: {
            sportId: sportId,
            level: newLevel,
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: { updateSport: null },
          };
        },
      },
    ];

    cache.writeQuery({
      query: GetUserDetailDocument,
      variables: { profileId: user.profile.id },
      data: {
        getUserDetail: {
          __typename: 'getUserDetail',
          user,
          myProfile: true,
          id: user.id,
        },
      },
    });

    const currentCache = cache.readQuery<GetUserDetailQuery>({
      query: GetUserDetailDocument,
      variables: { profileId: user.profile.id },
    });

    wrapper = mountWithTheme(tree, mocks, cache);

    act(() => {
      wrapper.find('Select').instance().selectOption({ value: newLevel });
    });

    await waitForComponentToPaint(wrapper, 90);

    const form = wrapper.find('form');

    form.first().simulate('submit');
    await waitForComponentToPaint(wrapper, 90);

    const updatedCache = cache.readQuery<GetUserDetailQuery>({
      query: GetUserDetailDocument,
      variables: { profileId: user.profile.id },
    });

    expect(currentCache).toStrictEqual(updatedCache);
    expect(mutationCalled).toBe(true);
  });

  test('should submit incorrectly', async () => {
    const mocks = [
      {
        request: {
          query: UpdateSportDocument,
          variables: {
            sportId: sportId,
            level: newLevel,
          },
        },
        error: new Error('Error!'),
      },
    ];

    wrapper = mountWithTheme(tree, mocks, cache);
    const errorSpy = jest.spyOn(error, 'errorHandler');

    act(() => {
      wrapper.find('Select').instance().selectOption({ value: newLevel });
    });

    await waitForComponentToPaint(wrapper, 90);

    const form = wrapper.find('form');

    form.first().simulate('submit');
    await waitForComponentToPaint(wrapper, 90);

    expect(errorSpy).toBeCalledTimes(1);
  });
});
