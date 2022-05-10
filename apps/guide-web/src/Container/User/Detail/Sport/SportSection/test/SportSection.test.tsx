import ProfileDetailSport from '..';
import { ReactWrapper } from 'enzyme';
import {
  getTestUser,
  getTestSports,
} from '../../../../../../lib/jest/data/user';
import { mountWithTheme, customFind } from '../../../../../../lib/jest';

describe('ProfileDetailSport', () => {
  let tree: React.ReactNode;
  let wrapper: ReactWrapper;

  test('should render correctly not my profile', () => {
    const sports = [getTestSports(), getTestSports()];
    const user = getTestUser(null, { sport: sports });

    const data = {
      getUserDetail: {
        __typename: 'ProfileDetailResponse' as const,
        id: user.id + '',
        myProfile: false,
        user,
      },
    };

    tree = (
      <ProfileDetailSport
        profileId={data.getUserDetail.user.profile.id}
        data={data}
      />
    );

    wrapper = mountWithTheme(tree);

    const sportSection = customFind(
      wrapper,
      'data-test',
      'sport-section'
    ).first();
    expect(sportSection.length).toBe(1);

    const addButton = customFind(wrapper, 'data-test', 'add-button');
    expect(addButton.length).toBe(0);

    sports.forEach((sport) => {
      const comp = wrapper.findWhere((node) => node.key() === sport.id + '');

      const level = customFind(comp, 'data-test', 'level');
      const title = customFind(comp, 'data-test', 'title');
      const deleteButton = customFind(comp, 'data-test', 'delete-button');
      const editButton = customFind(comp, 'data-test', 'edit-button');
      expect(comp.length).toBe(1);
      expect(level.length).toBe(1);
      expect(title.length).toBe(1);
      expect(deleteButton.length).toBe(0);
      expect(editButton.length).toBe(0);
    });
  });

  test('should render correctly  my profile', () => {
    const sports = [getTestSports(), getTestSports()];
    const user = getTestUser(null, { sport: sports });

    const data = {
      getUserDetail: {
        __typename: 'ProfileDetailResponse' as const,
        id: user.id + '',
        myProfile: true,
        user,
      },
    };

    tree = (
      <ProfileDetailSport
        profileId={data.getUserDetail.user.profile.id}
        data={data}
      />
    );

    wrapper = mountWithTheme(tree);

    const sportSection = customFind(
      wrapper,
      'data-test',
      'sport-section'
    ).first();
    expect(sportSection.length).toBe(1);

    const addButton = customFind(wrapper, 'data-test', 'add-button');
    expect(addButton.length).toBe(1);

    sports.forEach((sport) => {
      const comp = wrapper.findWhere((node) => node.key() === sport.id + '');

      const level = customFind(comp, 'data-test', 'level');
      const title = customFind(comp, 'data-test', 'title');
      const deleteButton = customFind(comp, 'data-test', 'delete-button');
      const editButton = customFind(comp, 'data-test', 'edit-button');
      expect(comp.length).toBe(1);
      expect(level.length).toBe(1);
      expect(title.length).toBe(1);
      expect(deleteButton.length).toBe(1);
      expect(editButton.length).toBe(1);
    });
  });
});
