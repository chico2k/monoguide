import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput2 from '../../../../Components/Elements/Form/TextInput_re';
import { passwordRequiredValidation, emailValidation } from '../../../../lib/Validation';
import Link from 'next/link';
import Spinner from '../../../../Components/Spinner';
import { pageIndex } from '../../../../../pages/pageIndex';
import FormWrapper from '../../../../Components/Elements/Form/FormWrapper';
import FormHeader from '../../../../Components/Elements/Form/FormHeader';
import FormHeaderTitle from '../../../../Components/Elements/Form/FormHeader/FormHeaderTitle';
import FormHeaderAltLink from '../../../../Components/Elements/Form/FormHeader/FormHeaderAltLink';
import ButtonSubmit from '../../../../Components/Elements/Form/Button';
import FormBody from '../../../../Components/Elements/Form/FormBody';
import Form from '../../../../Components/Elements/Form/Form';
import useLogin from '../../Hooks/useLogin';
import SocialLogin from '../../Social';

const validationSchema = {
  password: passwordRequiredValidation,
  email: emailValidation,
};
const initialValues = { email: '', password: '' };

const LoginForm = ({ query }) => {
  const { useLoginHandler } = useLogin(query);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => Yup.object().shape(validationSchema)}
      onSubmit={useLoginHandler}
    >
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;

        return (
          <FormWrapper>
            <FormHeader>
              <FormHeaderTitle>Sign in to your account</FormHeaderTitle>
              <FormHeaderAltLink href={pageIndex.auth.register}>Register here</FormHeaderAltLink>
            </FormHeader>

            <FormBody>
              <Form onSubmit={handleSubmit}>
                <TextInput2 label="Email" type="email" name="email" />
                <TextInput2 label="Password" type="password" name="password" />

                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <Link href={pageIndex.auth.forgotPassword}>
                      <a href="#" className="font-medium text-green-600 hover:text-green-500">
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>

                <ButtonSubmit size={3}>Sign in</ButtonSubmit>
              </Form>
              <SocialLogin />
            </FormBody>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export { LoginForm };
export default LoginForm;
