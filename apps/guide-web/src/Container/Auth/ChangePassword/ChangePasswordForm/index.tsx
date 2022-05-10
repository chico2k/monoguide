import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from '../../../../Components/Elements/Form/Form';

import Spinner from '../../../../Components/Spinner';
import { passwordValidation, passwordRequiredValidation } from '../../../../lib/Validation';
import ButtonSubmit from '../../../../Components/Elements/Form/Button';
import useChangePassword from '../../Hooks/useChangePassword';
import TextInput2 from '../../../../Components/Elements/Form/TextInput_re';

const validationSchema = () =>
  Yup.object().shape({
    password: passwordValidation,
    re_password: passwordRequiredValidation,
    current_password: passwordRequiredValidation,
  });
const initialValues = { password: '', re_password: '', current_password: '' };

const AuthChangePasswordForm = () => {
  const { useChangePasswordHandler } = useChangePassword();

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={useChangePasswordHandler}>
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <TextInput2 type="password" name="password" label="New Password" />
                <TextInput2 type="password" name="re_password" label="New Password (again)" />
              </div>
              <TextInput2 type="password" name="current_password" label="Current Password" />
            </div>
            <ButtonSubmit size={3}>Set New Password</ButtonSubmit>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthChangePasswordForm;
