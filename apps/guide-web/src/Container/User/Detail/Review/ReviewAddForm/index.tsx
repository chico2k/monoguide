import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import * as Yup from 'yup';
import Button from '../../../../../Components/Elements/Form/Button';
import ReviewInput from '../../../../../Components/Elements/Form/RatingInput';
import TextAreaInput from '../../../../../Components/Elements/Form/TextAreaInput';
import TextInput from '../../../../../Components/Elements/Form/TextInput';
import useReviewAdd from './useReviewAdd';

interface IProps {}

const AddReviewForm: React.FC<IProps> = () => {
  const { reviewAddSubmitHandler } = useReviewAdd();

  return (
    <Formik
      initialValues={{ title: '', rating: null, text: '' }}
      validationSchema={() =>
        Yup.object().shape({
          title: Yup.string().required('Please enter a Title'),
          text: Yup.string().required('Please enter a Text'),
          rating: Yup.string().required('Please enter a Rating'),
        })
      }
      onSubmit={async ({ text, rating, title }) => await reviewAddSubmitHandler({ text, rating, title })}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <ReviewInput name="rating" />
            <TextInput type="input" name="title" placeholder="Title" label="Title" />
            <TextAreaInput name="text" placeholder="Text" label="text" />
            <Button type="submit">Submit Review</Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddReviewForm;
