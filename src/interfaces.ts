export interface ComponentProps {
  /**
   * This function makes sure the modal will close.
   */
  hideModal: Function;

  /**
   * Boolean value that holds the visibility state of the modal.
   * When true, the modal will show itself.
   */
  isOpen: boolean;
}

export interface ProviderState {
  /**
   * Modal component to be rendered. It should be a function or a class component, not the JSX.
   */
  component: React.ReactType<ComponentProps> | null;

  /**
   * This function makes sure the modal the user passed as parameter will open and render with
   * the necessary props from the context store and from the user.
   */
  showModal: Function;

  /**
   * This function makes sure the modal will close.
   */
  hideModal: Function;

  /**
   * The user can use this object to pass custom props to the modal. These props will be
   * destructerd, like <Component {...modalProps} />;
   */
  modalProps: Object;

  /**
   * Boolean value that holds the visibility state of the modal.
   * When true, the modal will show itself.
   */
  isOpen: boolean;
}

export interface ShowModalParams {
  /**
   * Modal component to be rendered. It should be a function or a class component, not the JSX.
   */
  component: React.ReactType<ComponentProps>;

  /**
   * The user can use this object to pass custom props to the modal. These props will be
   * destructerd, like <Component {...modalProps} />;
   */
  modalProps: Object;
}
