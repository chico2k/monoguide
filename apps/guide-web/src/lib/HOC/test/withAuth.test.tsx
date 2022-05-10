import React from 'react';
import pageWrapper from '../pageWrapper';
import * as redirect from '../redirectHOC';
import * as refresh from '../../helpers/getRefreshToken';
import sinon, { SinonSandbox } from 'sinon';
import { NextPage } from 'next';
import { mount } from 'src/Container/Auth/Login/LoginForm/test/node_modules/src/Components/Elements/Form/Button/tests/node_modules/enzyme';
import { mountWithTheme } from '../../jest';

interface Props {
  id: number;
}

const TextComp: NextPage<Props> = () => {
  return <div>TextComp</div>;
};
TextComp.getInitialProps = async () => {
  return { id: 1 };
};

describe('with Auth', () => {
  let sandbox: SinonSandbox;
  let wrapper: any;

  const writeHead = jest.fn();
  const end = jest.fn();
  const ctx = {
    NextPageContext: null,
    pathname: null,
    res: { response: 'object', writeHead, end },
    AppTree: null,
    query: {},
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  test('should render correctly without Access Token', async () => {
    let Tree = pageWrapper(true)(TextComp);
    const redirectSpy = sandbox.spy(redirect, 'redirectHandler');

    const tokenStub = sandbox
      .stub(refresh, 'getRefreshTokenAndUser')
      .callsFake(() => {
        return Promise.resolve({ accessToken: '' });
      });

    await Tree.getInitialProps(ctx as any);

    sandbox.assert.calledOnce(tokenStub);
    sandbox.assert.calledOnce(redirectSpy);
    sandbox.assert.calledWith(redirectSpy, ctx as any, '/auth/login');
  });

  test('should render correctly with Access Token', async () => {
    let Tree = pageWrapper(true)(TextComp);
    const redirectSpy = sandbox.spy(redirect, 'redirectHandler');

    const tokenStub = sandbox
      .stub(refresh, 'getRefreshTokenAndUser')
      .callsFake(() => {
        return Promise.resolve({ accessToken: 'token' });
      });

    await Tree.getInitialProps(ctx as any);

    sandbox.assert.calledOnce(tokenStub);
    sandbox.assert.notCalled(redirectSpy);
  });

  test('should have correct props', async () => {
    let Tree = pageWrapper(false)(TextComp);

    const props = await Tree.getInitialProps(ctx as any);

    expect(props).toEqual({
      id: 1,
    });
  });
});
