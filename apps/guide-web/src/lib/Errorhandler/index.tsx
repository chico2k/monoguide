export const errorHandler = (
  setFieldError: (field: string, message: string) => void,
  error: any
) => {
  if (!error.graphQLErrors || error.graphQLErrors.length < 1) return {};

  const { extensions } = error.graphQLErrors[0];

  if (extensions.field)
    return setFieldError(extensions.field, error.graphQLErrors[0].message);

  const { exception } = extensions;
  const { validationErrors } = exception;
  if (exception.validationErrors)
    return validationErrors.map((error: any) => {
      Object.keys(error.constraints).map((errorKey) =>
        setFieldError(error.property, error.constraints[errorKey])
      );
    });
};
