import AddSportForm from '../../User/Detail/Sport/AddSport/AddSportForm';
import DeleteSportForm from '../../User/Detail/Sport/DeleteSport/DeleteSportForm';
import EditSportForm from '../../User/Detail/Sport/EditSport/SportEditForm';
import EditLocationForm from '../../User/Detail/Location/EditLocationForm';
import AddReviewForm from '../../User/Detail/Review/ReviewAddForm';
import AddImageForm from '../../User/Detail/Image/ImageAddForm';
import ImageOverview from '../../User/Detail/Image/ImageOverview';
import ImageDetail from '../../User/Detail/Image/ImageDetail';
import ImageAvatarForm from '../../User/Detail/Image/ImageAvatarForm';

export const MODAL_COMPONENTS = {
  // Sports
  ADD_SPORT: {
    component: AddSportForm,
  },
  EDIT_SPORT: {
    component: EditSportForm,
  },

  DELETE_SPORT: {
    component: DeleteSportForm,
  },

  // Location
  EDIT_LOCATION: {
    component: EditLocationForm,
  },
  ADD_REVIEW: {
    component: AddReviewForm,
  },

  // Profile Image
  ADD_IMAGE: {
    component: AddImageForm,
  },
  GET_IMAGE_OVERVIEW: {
    component: ImageOverview,
  },
  GET_IMAGE_DETAIL: {
    component: ImageDetail,
  },
  CHANGE_PROFILE_IMAGE: {
    component: ImageAvatarForm,
  },
};
