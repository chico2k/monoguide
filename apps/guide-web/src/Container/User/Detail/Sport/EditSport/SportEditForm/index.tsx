import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { levelOptions } from '../../constants';
import { levelValidation } from '../../../../../../lib/Validation';
import Button from '../../../../../../Components/Elements/Form/Button';
import SelectInput from '../../../../../../Components/Elements/Form/SelectInput';
import Spinner from '../../../../../../Components/Spinner';
import useSportEdit from './hooks';

export interface IProps {
  level: number;
  sportId: number;
}

const initialValues: { level?: number } = {
  level: null,
};

const validationSchema = () =>
  Yup.object().shape({
    level: levelValidation,
  });

const EditSportForm: React.FC<IProps> = ({ sportId, level }) => {
  const { sportEditSubmitHandler } = useSportEdit();

  // Get from initial Value the object for Select Initial
  const initialSelect = levelOptions[levelOptions.findIndex((v) => v.value === level.toString())];

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async ({ level }) => await sportEditSubmitHandler({ sportId, level })}
    >
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;
        return (
          <div className="flex flex-col h-full">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex-auto flex  items-center justify-center">
                  <SelectInput
                    label="Level"
                    options={levelOptions}
                    name="level"
                    defaultValue={initialSelect}
                    isClearable={false}
                  />
                </div>
                <Button type="submit">Edit Sport</Button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default EditSportForm;
