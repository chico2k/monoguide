import React from 'react';
import AddSportButton from '..';
import { mountWithTheme } from '../../../../../../../lib/jest';
import * as actions from '../../../../../../Modal/actions';
import { ADD_SPORT } from '../../../../../../Modal/constants';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: 'asPath',
    };
  },
}));

describe('Add Sport Button', () => {
  const tree = <AddSportButton profileId={1} />;
  const wrapper = mountWithTheme(tree);

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', async () => {
    const button = wrapper.find('button');
    const modalOpenSpy = jest.spyOn(actions, 'modalOpen');

    button.simulate('click');

    expect(modalOpenSpy).toBeCalled();

    expect(modalOpenSpy).toBeCalledWith({
      modalProps: { profileId: 1 },
      modalTargetURL: 'sports/add-sports',
      modalType: ADD_SPORT,
      originURL: 'asPath',
    });
  });
});
