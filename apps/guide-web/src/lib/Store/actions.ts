import { UserState } from './types';
import * as actionTypes from './constants';

interface IUpdateUserPayload {
  actionType: string;
  payload: UserState;
}

export const updateUserInState = (payload: IUpdateUserPayload) => {
  return {
    type: payload.actionType,
    payload: payload.payload,
  };
};

export const removeUserInState = () => {
  return {
    type: actionTypes.USER_REMOVE,
  };
};

export const setLoading = (status: boolean) => {
  console.log('called');
  return {
    type: actionTypes.SET_LOADING,
    payload: status,
  };
};
