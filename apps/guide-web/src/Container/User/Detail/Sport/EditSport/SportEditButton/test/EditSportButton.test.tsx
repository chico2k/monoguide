import SportEditButton from '..';
import { mountWithTheme } from '../../../../../../../lib/jest';
import * as actions from '../../../../../../Modal/actions';
import { EDIT_SPORT } from '../../../../../../Modal/constants';

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
    level: 3,
  };
  const tree = <SportEditButton {...props} />;
  const wrapper = mountWithTheme(tree);

  test('should render correctly', async () => {
    const button = wrapper.find('button');
    const modalOpenSpy = jest.spyOn(actions, 'modalOpen');

    button.simulate('click');

    expect(modalOpenSpy).toBeCalled();
    expect(modalOpenSpy).toBeCalledWith({
      modalProps: {
        ...props,
      },
      modalTargetURL: `/sports/${props.sportId}/edit-sports`,
      modalType: EDIT_SPORT,
      originURL: 'asPath',
    });
  });
});
