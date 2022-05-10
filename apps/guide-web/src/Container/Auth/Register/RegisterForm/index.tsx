import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { passwordValidation, emailValidation, nameValidation } from '../../../../lib/Validation';
import Spinner from '../../../../Components/Spinner';
import { pageIndex } from '../../../../../pages/pageIndex';
import TextInput2 from '../../../../Components/Elements/Form/TextInput_re';
import useRegister from '../../Hooks/useRegister';
import FormWrapper from '../../../../Components/Elements/Form/FormWrapper';
import FormHeader from '../../../../Components/Elements/Form/FormHeader';
import FormHeaderTitle from '../../../../Components/Elements/Form/FormHeader/FormHeaderTitle';
import FormHeaderAltLink from '../../../../Components/Elements/Form/FormHeader/FormHeaderAltLink';
import FormBody from '../../../../Components/Elements/Form/FormBody';
import Form from '../../../../Components/Elements/Form/Form';
import SocialLogin from '../../Social';
import ButtonSubmit from '../../../../Components/Elements/Form/Button';

const validationSchema = {
  password: passwordValidation,
  email: emailValidation,
  name: nameValidation,
};

const initialValues = {
  email: '',
  password: '',
  name: '',
};

const RegisterFrom = () => {
  const { useRegisterHandler } = useRegister();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => Yup.object().shape(validationSchema)}
      onSubmit={useRegisterHandler}
    >
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <FormWrapper>
            <FormHeader>
              <FormHeaderTitle>Register your account</FormHeaderTitle>
              <FormHeaderAltLink href={pageIndex.auth.login}> Sign in here</FormHeaderAltLink>
            </FormHeader>

            <FormBody>
              <Form onSubmit={handleSubmit}>
                <TextInput2 label="Name" type="text" name="name" />
                <TextInput2 label="Email" type="email" name="email" />
                <TextInput2 label="Password" type="password" name="password" />
                <ButtonSubmit size={3}>Register</ButtonSubmit>
              </Form>

              <SocialLogin />
            </FormBody>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export default RegisterFrom;
