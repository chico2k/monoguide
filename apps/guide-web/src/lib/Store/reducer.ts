import { State, ModalSize, ModalState, UserState } from './types';
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import produce from 'immer';
import * as actionTypes from './constants';

export const initialState = {
  modalState: {
    open: false,
    modalType: null,
    modalProps: null,
    originURL: null,
    modalTargetURL: null,
    size: ModalSize.full,
    title: null,
  },
  userState: undefined,
  loadingState: {
    isLoading: false,
  },
};

const reducer = (state: State = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.MODAL_OPEN:
        draft.modalState.open = true;
        draft.modalState.modalType = action.payload.modalType;
        draft.modalState.modalProps = action.payload.modalProps;
        draft.modalState.originURL = action.payload.originURL;
        draft.modalState.modalTargetURL = action.payload.modalTargetURL;
        draft.modalState.size = action.payload.size;
        draft.modalState.title = action.payload.title;

        break;

      case actionTypes.MODAL_CLOSE:
        draft.modalState.open = false;
        draft.modalState.modalType = null;
        draft.modalState.modalProps = null;
        draft.modalState.originURL = null;
        draft.modalState.modalTargetURL = null;
        draft.modalState.size = null;
        draft.modalState.title = null;

        break;
      case actionTypes.USER_UPDATE:
        draft.userState = { ...action.payload };
        break;
      case actionTypes.USER_REMOVE:
        draft.userState = undefined;
        break;
      case actionTypes.SET_LOADING:
        draft.loadingState.isLoading = action.payload;
        break;
    }
  });
};

export const getModalState = (state: State): ModalState => state.modalState;
export const getUserState = (state: State): UserState => state.userState;

export default reducer;
