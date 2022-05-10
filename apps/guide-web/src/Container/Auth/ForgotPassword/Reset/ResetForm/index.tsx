import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { emailValidation } from '../../../../../lib/Validation';
import Spinner from '../../../../../Components/Spinner/';
import TextInput2 from '../../../../../Components/Elements/Form/TextInput_re';
import FormWrapper from '../../../../../Components/Elements/Form/FormWrapper';
import FormHeader from '../../../../../Components/Elements/Form/FormHeader';
import FormHeaderTitle from '../../../../../Components/Elements/Form/FormHeader/FormHeaderTitle';
import ButtonSubmit from '../../../../../Components/Elements/Form/Button';
import FormBody from '../../../../../Components/Elements/Form/FormBody';
import Form from '../../../../../Components/Elements/Form/Form';
import useResetPassword from '../../../Hooks/useResetPassword';

const validationSchema = () =>
  Yup.object().shape({
    email: emailValidation
  });
const initialValues = { email: '' };

const PasswordResetForm = () => {
  const { useResetPasswordHandler, verified, expired, initiated } =
    useResetPassword();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={useResetPasswordHandler}
    >
      {({ handleSubmit, isSubmitting }) => {
        if (verified) return <div>Signed in on other tab</div>;
        if (expired) return <div>Magic link has expired</div>;
        if (initiated) return <div>Stay tuned</div>;

        return (
          <FormWrapper>
            <FormHeader>
              <FormHeaderTitle>Reset your password</FormHeaderTitle>
            </FormHeader>

            <FormBody>
              <Form onSubmit={handleSubmit}>
                <TextInput2 label="Email" type="email" name="email" />
                <ButtonSubmit size={3}>Sign in</ButtonSubmit>
              </Form>
            </FormBody>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export default PasswordResetForm;
