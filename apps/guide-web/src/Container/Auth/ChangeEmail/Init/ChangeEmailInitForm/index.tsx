import React from 'react';
import { Formik } from 'formik';
import Form from '../../../../../Components/Elements/Form/Form';
import * as Yup from 'yup';

import { emailValidation } from '../../../../../lib/Validation';
import ButtonSubmit from '../../../../../Components/Elements/Form/Button';
import TextInput2 from '../../../../../Components/Elements/Form/TextInput_re';
import useChangeEmailInit from '../../../Hooks/useChangeEmailInit';

const validationSchema = () =>
  Yup.object().shape({
    email: emailValidation,
    re_email: emailValidation,
  });
const initialValues = { email: '', re_email: '' };

const AuthChangeEmailSetForm = () => {
  const { useChangeEmailInitHandler } = useChangeEmailInit();

  console.log('useChangeEmailInitHandler', useChangeEmailInitHandler);
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={useChangeEmailInitHandler}>
      {({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <TextInput2 type="email" name="email" label="Email" />
              <TextInput2 type="email" name="re_email" label="New Email (again)" />
            </div>
            <ButtonSubmit size={3}>Set your new Email</ButtonSubmit>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthChangeEmailSetForm;
