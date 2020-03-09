import React from 'react';

interface ComponentProps {
  onCancel: Function;
  hideModal: Function;
}

interface ProviderState {
  component?: React.ReactType<ComponentProps>;
  showModal: Function;
  hideModal: Function;
  modalProps: Object;
}

export const ModalContext = React.createContext<ProviderState>({
  component: null,
  showModal: () => {},
  hideModal: () => {},
  modalProps: {},
});
