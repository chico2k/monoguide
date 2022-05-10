import * as Yup from 'yup';

export const passwordValidation = Yup.string()
  .required('Please enter Password')
  .min(9, 'Minimum Length of 9 Characters');

export const passwordRequiredValidation = Yup.string().required('Please enter Password');

export const emailValidation = Yup.string().email('Please enter a valid email').required('Please enter an email');

export const firstNameValidation = Yup.string().required('What is your first name?');
export const nameValidation = Yup.string().required('What is your name?');

export const phoneValidation = Yup.string().required('What is your phone number?');
export const phoneConfirmValidation = Yup.string().required('What is your validation code?');

export const lastNameValidation = Yup.string().required('What is your last name?');

export const sporttypeValidation = Yup.string().required('Pick a Sport').nullable();

export const levelValidation = Yup.string().required('Whats your level?').nullable();
