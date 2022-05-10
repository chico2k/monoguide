import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { emailValidation } from '../../../../lib/Validation';
import Spinner from '../../../../Components/Spinner';
import TextInput2 from '../../../../Components/Elements/Form/TextInput_re';
import Button from '../../../../Components/Elements/Link';
import FormWrapper from '../../../../Components/Elements/Form/FormWrapper';
import FormHeader from '../../../../Components/Elements/Form/FormHeader';
import Form from '../../../../Components/Elements/Form/Form';
import FormHeaderTitle from '../../../../Components/Elements/Form/FormHeader/FormHeaderTitle';
import FormBody from '../../../../Components/Elements/Form/FormBody';
import ButtonSubmit from '../../../../Components/Elements/Form/Button';
import useResendActivation from '../../Hooks/useResendActivation';

export const validationSchema = () =>
  Yup.object().shape({
    email: emailValidation,
  });
const initialValues = { email: '' };

const ActivateResendForm: React.FC = () => {
  const { useResendActivationHandler } = useResendActivation();
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={useResendActivationHandler}>
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <FormWrapper>
            <FormHeader>
              <FormHeaderTitle>Resend your activation link</FormHeaderTitle>
            </FormHeader>

            <FormBody>
              <Form onSubmit={handleSubmit}>
                <TextInput2 label="Email" type="email" name="email" />

                <div>
                  <ButtonSubmit primary size={3}>
                    Resend activation link
                  </ButtonSubmit>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white text-sm text-gray-500">or</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Button secondary size={3}>
                      Register
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button size={3}>Sign in</Button>
                  </div>
                </div>
              </Form>
            </FormBody>
          </FormWrapper>
        );
      }}
    </Formik>
  );
};

export default ActivateResendForm;
