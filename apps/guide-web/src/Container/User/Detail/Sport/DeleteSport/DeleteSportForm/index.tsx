import React from 'react';
import { Formik } from 'formik';

import Button from '../../../../../../Components/Elements/Form/Button/';
import Spinner from '../../../../../../Components/Spinner';
import useSportDelete from './hooks';

interface IProps {
  sportId: number;
  sportRef: { title: string; id: number };
}

const DeleteSportForm: React.FC<IProps> = ({ sportId, sportRef }) => {
  const { sportDeleteSubmitHandler } = useSportDelete();

  const initialValues: { sportId?: number } = {
    sportId
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ sportId }) =>
        await sportDeleteSubmitHandler({ sportId, sportRef })
      }
    >
      {({ handleSubmit, isSubmitting }) => {
        if (isSubmitting) return <Spinner />;

        return (
          <div className="flex flex-col h-full">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex-auto flex  items-center justify-center">
                  <span>Are you sure?</span>
                </div>
                <Button size={1} type="submit">
                  Delete Sport
                </Button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default DeleteSportForm;
