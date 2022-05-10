import ActivateResend, { InnerForm, validationSchema } from '..';
import {
  shallowWithTheme,
  waitForComponentToPaint,
  mountWithTheme,
} from '../../../../../lib/jest';
import { ConfirmResendDocument } from '../../../../../generated/graphql';
import sinon, { SinonSandbox } from 'sinon';
import * as errorHandler from '../../../../../lib/helpers/errorHandler';

describe('Inner form', () => {
  let wrapper: any;
  const handleSubmit = jest.fn();

  beforeEach(() => {
    const tree = <InnerForm handleSubmit={handleSubmit} isSubmitting={false} />;
    wrapper = shallowWithTheme(tree);
  });

  test('should render successfully', async () => {
    await waitForComponentToPaint(wrapper);

    const form = wrapper.find('form');
    const button = wrapper.find('index');

    expect(form.length).toBe(1);
    expect(button.length).toBe(1);
  });

  test('should submit correctly', async () => {
    await waitForComponentToPaint(wrapper);

    const textInputField = wrapper.find('[name="email"]');

    const newVal = 'email@domain.com';
    textInputField.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: newVal },
    });
    textInputField.simulate('blur');

    await waitForComponentToPaint(wrapper);

    const form = wrapper.find('form');
    form.first().simulate('submit');

    expect(handleSubmit).toBeCalledTimes(1);
  });

  test('should return Spinner while submitting', async () => {
    const tree = <InnerForm handleSubmit={handleSubmit} isSubmitting={true} />;
    wrapper = shallowWithTheme(tree);

    const form = wrapper.find('form');
    expect(form.length).toBe(0);

    const spinner = wrapper.find('Spinner');
    expect(spinner.length).toBe(1);
  });
});

describe('should render component correctly ', () => {
  let wrapper: any;

  beforeEach(() => {
    const tree = <ActivateResend />;

    wrapper = mountWithTheme(tree);
  });

  test('should render correctly', async () => {
    await waitForComponentToPaint(wrapper);
    const formik = wrapper.find('Formik');

    expect(formik.length).toBe(1);
  });

  test('should validate correctly', async () => {
    const expected = validationSchema();

    expect(expected).toBeTruthy();
  });
});

describe('should run mutation correctly', () => {
  let wrapper: any;
  let mutationCalled: boolean;
  let tree: React.ReactNode;
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    tree = <ActivateResend />;
  });

  test('should run correctly ', async () => {
    const mocks = [
      {
        request: {
          query: ConfirmResendDocument,
          variables: { email: 'email@domain.com' },
        },
        result: () => {
          mutationCalled = true;
          return { data: { confirmResend: true } };
        },
      },
    ];

    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form');
    const textInputField = wrapper
      .find('[data-test="textInputField"]')
      .children();

    const newVal = 'email@domain.com';
    textInputField.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: newVal },
    });

    textInputField.simulate('blur');
    await waitForComponentToPaint(wrapper);

    form.first().simulate('submit');
    await waitForComponentToPaint(wrapper, 30);

    expect(mutationCalled).toBe(true);
  });

  test('should fail', async () => {
    const mocks = [
      {
        request: {
          query: ConfirmResendDocument,
          variables: { email: 'email@domain.com' },
        },
        error: new Error('Error'),
      },
    ];

    const errorStub = sandbox.stub(errorHandler, 'errorHandler');

    wrapper = mountWithTheme(tree, mocks);
    const form = wrapper.find('form');
    const textInputField = wrapper
      .find('[data-test="textInputField"]')
      .children();

    const newVal = 'email@domain.com';
    textInputField.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: newVal },
    });

    textInputField.simulate('blur');
    await waitForComponentToPaint(wrapper);

    form.first().simulate('submit');

    await waitForComponentToPaint(wrapper, 30);

    sandbox.assert.called(errorStub);
  });
});
