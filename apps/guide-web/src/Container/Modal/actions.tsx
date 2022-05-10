import * as actionTypes from './constants';

export interface ModalOpenPayload {
  modalType: string;
  modalProps: {};
  originURL: string;
  modalTargetURL: string;
  size: 'small' | 'medium' | 'full';
  title: string;
}

export const modalOpen = (payload: ModalOpenPayload) => {
  return {
    type: actionTypes.MODAL_OPEN,
    payload,
  };
};

export const modalClose = () => {
  return {
    type: actionTypes.MODAL_CLOSE,
  };
};
