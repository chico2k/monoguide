import DeleteSportButton from '..';
import { mountWithTheme } from '../../../../../../lib/jest';
import * as actions from '../../../../../modal/actions';
import { EDIT_LOCATION } from '../../../../../modal/constants';

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
        ...props,
      },
      'modalTargetURL': `/locations/edit-locations`,
      'modalType': EDIT_LOCATION,
      'originURL': 'asPath',
    });
  });
});
