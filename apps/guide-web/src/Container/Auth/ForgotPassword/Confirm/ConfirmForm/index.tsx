import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { passwordRequiredValidation, passwordValidation } from '../../../../../lib/Validation';
import Spinner from '../../../../../Components/Spinner/';
import TextInput from '../../../../../Components/Elements/Form/TextInput';
import Form from '../../../../../Components/Elements/Form/Form';
import useConfirmPassword from '../../../Hooks/useConfirmPassword';
import ButtonSubmit from '../../../../../Components/Elements/Form/Button';

interface IProps {
  query: {
    token: string;
    username: string;
  };
}

const validationSchema = () =>
  Yup.object().shape({
    password: passwordValidation,
    re_password: passwordRequiredValidation,
  });
const initialValues = { password: '', re_password: '' };

const PasswordConfirmForm = ({ query }: IProps) => {
  const { useConfirmPasswordHandler } = useConfirmPassword({ query });
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={useConfirmPasswordHandler}>
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <Form onSubmit={handleSubmit}>
            <TextInput type="password" name="password" placeholder="New Password" label="New Password" />
            <TextInput type="password" name="re_password" placeholder="Re New Password" label="Re New Password" />
            <ButtonSubmit size={3}>Set new Password</ButtonSubmit>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PasswordConfirmForm;
