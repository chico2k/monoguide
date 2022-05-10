import React from 'react';
import { Formik } from 'formik';
import AsyncSelectInput from '../../../../../../Components/Elements/Form/AsyncSelectInput';
import SelectInput from '../../../../../../Components/Elements/Form/SelectInput';
import Button from '../../../../../../Components/Elements/Form/Button';
import * as Yup from 'yup';
import { levelOptions } from '../../constants';
import {
  sporttypeValidation,
  levelValidation
} from '../../../../../../lib/Validation';
import Spinner from '../../../../../../Components/Spinner';
import useAddSport from './hooks';
import { useGetSportRefListQuery } from '../../../../../../../generated/graphql';

interface IProps {}

const initialValues: { sportRef?: number; level?: string } = {
  sportRef: null,
  level: null
};

const validationSchema = () =>
  Yup.object().shape({
    sportRef: sporttypeValidation,
    level: levelValidation
  });

const AddSportForm: React.FC<IProps> = () => {
  const { addSportSubmitHandler, loadOptions } = useAddSport();
  const { data, loading, error } = useGetSportRefListQuery();

  if (error) {
    console.error(error.message);
    return null;
  }

  if (loading) return <Spinner />;
  if (data.getSportRefList.length < 1)
    return <div>You have added all sports already! </div>;

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async ({ level, sportRef }) => {
        return await addSportSubmitHandler({ level: +level, sportRef });
      }}
    >
      {({ handleSubmit, isSubmitting, values, errors }) => {
        console.log('va', values);
        console.log('va', errors);
        // console.log('isSubmitting', isSubmitting);
        if (isSubmitting) return <Spinner />;
        return (
          <div className="flex flex-col h-full">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex-auto flex flex-col justify-center items-center ">
                  <AsyncSelectInput
                    name="sportRef"
                    label="Sport"
                    loadOptions={(input) => loadOptions(input, data)}
                  />
                  <SelectInput
                    label="Level"
                    options={levelOptions}
                    name="level"
                    isClearable={false}
                  />
                </div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddSportForm;
