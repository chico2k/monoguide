import reducer, { getModalState, initialState } from '../reducer';
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { MODAL_OPEN, MODAL_CLOSE } from '../constants';

describe('Reducer: Modal', () => {
  test('Reducer: MODAL_OPEN', () => {
    const action = {
      payload: {
        open: true,
        modalType: 'ModalType',
        modalProps: { prop: 'props' },
        originURL: 'url',
        modalTargetURL: 'target',
      },
      type: MODAL_OPEN,
    };

    const storeState = reducer(initialState, action);
    const newState = produce(storeState, (draft) => {
      draft.modalState.open = action.payload.open;
      draft.modalState.modalType = action.payload.modalType;
      draft.modalState.modalProps = action.payload.modalProps;
      draft.modalState.originURL = action.payload.originURL;
      draft.modalState.modalTargetURL = action.payload.modalTargetURL;
    });
    expect(storeState).toEqual(newState);
  });

  test('Reducer: MODAL_ClOSE ', () => {
    const state = {
      modalState: {
        open: true,
        modalType: 'ModalType',
        modalProps: { prop: 'props' },
        originURL: 'url',
        modalTargetURL: 'target',
      },
    };
    const action = {
      type: MODAL_CLOSE,
    };
    const storeState = reducer(state, action);

    const newState = produce(storeState, (draft) => {
      draft.modalState.open = false;
      draft.modalState.modalType = null;
      draft.modalState.modalProps = null;
      draft.modalState.modalProps = null;
      draft.modalState.modalTargetURL = null;
    });
    expect(storeState).toEqual(newState);
  });

  test('should return modalState', () => {
    const state = {
      modalState: {
        open: true,
        modalType: 'ModalType',
        modalProps: { prop: 'props' },
        originURL: 'url',
        modalTargetURL: 'target',
      },
    };

    const expected = getModalState(state);

    expect(expected).toEqual(state.modalState);
  });

  test('should return initial State', () => {
    const action = {
      type: MODAL_CLOSE,
    };
    const storeState = reducer(undefined, action);
    expect(storeState).toStrictEqual(initialState);
  });
});
