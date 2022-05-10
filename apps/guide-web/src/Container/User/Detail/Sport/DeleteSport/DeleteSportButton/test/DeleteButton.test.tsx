import DeleteSportButton from '..';
import { mountWithTheme } from '../../../../../../../lib/jest';
import * as actions from '../../../../../../Modal/actions';
import { DELETE_SPORT } from '../../../../../../Modal/constants';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: 'asPath',
    };
  },
}));

describe('Delete Sport Button', () => {
  const props = {
    profileId: 1,
    sportId: 2,
    sportType: {
      title: 'A title',
      id: 1,
    },
  };
  const tree = <DeleteSportButton {...props} />;
  const wrapper = mountWithTheme(tree);

  test('should render correctly', async () => {
    const button = wrapper.find('button');
    const modalOpenSpy = jest.spyOn(actions, 'modalOpen');

    button.simulate('click');

    expect(modalOpenSpy).toBeCalled();
    expect(modalOpenSpy).toBeCalledWith({
      'modalProps': {
        'profileId': 1,
        'sportId': 2,
        'sportType': {
          'id': 1,
          'title': 'A title',
        },
      },
      'modalTargetURL': `sports/${props.sportId}/delete-sports`,
      'modalType': DELETE_SPORT,
      'originURL': 'asPath',
    });
  });
});
