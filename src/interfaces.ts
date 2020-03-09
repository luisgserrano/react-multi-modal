export interface ComponentProps {
  onCancel: Function;
  hideModal: Function;
}

export interface ProviderState {
  component?: React.ReactType<ComponentProps>;
  showModal: Function;
  hideModal: Function;
  modalProps: Object;
}

export interface ShowModalParams {
  component: React.ReactType<ComponentProps>;
  modalProps: Object;
}
