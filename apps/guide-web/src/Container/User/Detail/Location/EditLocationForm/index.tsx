import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Spinner from '../../../../../Components/Spinner';
import Button from '../../../../../Components/Elements/Form/Button';
import LocationInput from '../../../../../Components/Elements/Form/LocationInput';
import useEditLocation from './hooks';

interface IProps {}

const EditLocationForm: React.FC<IProps> = () => {
  const { editLocationSubmitHandler } = useEditLocation();

  return (
    <Formik
      validationSchema={() =>
        Yup.object().shape({
          location: Yup.mixed().required('What`s your location?'),
        })
      }
      initialValues={{
        location: null,
      }}
      onSubmit={async ({ location }) => await editLocationSubmitHandler({ location })}
    >
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <div className="flex flex-col h-full">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex-auto flex flex-col justify-start items-center ">
                  <LocationInput name="location" />
                </div>
                <Button type="submit">Change Location</Button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default EditLocationForm;
