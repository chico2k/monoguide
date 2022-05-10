import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { MODAL_COMPONENTS } from './modalComponents';

import { modalClose } from './actions';

import { Context } from '../../lib/Store/AppContext';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#__next');
ReactModal.setAppElement('#__next');

interface Props {
  className?: string;
}
export const ReactModalAdapter: React.FC<Props> = ({ className }) => {
  const { state, dispatch } = useContext(Context);

  // Class names for Styling with Styled Components
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;

  // If no ModalType return Null
  if (!state.modalState.modalType) {
    return <></>;
  }

  // Get Modal derived from State: ModalType
  const SpecificModal = MODAL_COMPONENTS[state.modalState.modalType].component;

  // Function to Fire Close Actions
  const closeHandler = () => {
    window.history.pushState(null, '', state.modalState.originURL);
    dispatch(modalClose());
  };

  // Set Modal URL derived from State: ModalType
  window.history.pushState(null, '', `${state.modalState.originURL}/${state.modalState.modalTargetURL}`);

  const closeButton = (
    <>
      <button
        type="submit"
        onClick={() => {
          closeHandler();
        }}
        className="uppercase flex items-center text-gray-500 max-w-max
        hover:text-gray-600 focus:outline-none focus:text-green-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          height="32px"
          width="32px"
          className="-mr-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  );

  const modalHeight = state.modalState.size === 'small' ? '50vh' : state.modalState.size === 'medium' ? '75vh' : '95vh';

  const modalWidth = state.modalState.size === 'small' ? '75vw' : state.modalState.size === 'medium' ? '75vw' : '95vw';

  return (
    <ReactModal
      isOpen={state.modalState.open}
      onRequestClose={() => {
        closeHandler();
      }}
      parentSelector={() => document.querySelector('#__next')}
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
        },
        content: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: modalHeight,
          width: modalWidth,

          background: '#fff',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '7px',
          outline: 'none',
        },
      }}
    >
      {/* <div className='h-full bg-red-600' style={{ height: '95vh' }}>
        <div className='flex flex-col'>
          <div className='flex-auto overflow-y-auto p-5 space-y-4'>
            <Button
              type='submit'
              onClick={() => {
                closeHandler();
              }}
            >
              Close
            </Button>
          </div>
          <div className='flex-auto overflow-y-auto p-5 space-y-4 bg-yellow-200'>
            <SpecificModal {...state.modalState.modalProps} />
          </div>
          <div className='bg-green-200 flex-none h-40'>Footer</div>
        </div>
      </div> */}
      <div
        className="flex flex-col bg-white h-full "
        // style={{ height: '100%' }}
      >
        <div className="h-14 flex-none bg-gray-50 flex items- justify-between border border-solid border-b pt-3 px-6">
          <div className="text-green-600 text-2xl font-bold">{state.modalState.title}</div>
          <div className="flex-none">{closeButton}</div>
        </div>

        <div className="flex-auto overflow-y-auto pb-10 px-6">
          <SpecificModal {...state.modalState.modalProps} />
        </div>
      </div>
    </ReactModal>
  );
};

export default ReactModalAdapter;
