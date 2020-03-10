import React from 'react';
import { ModalContext } from './context/Provider';

/**
 * This will be the component that will render every modal component that the user wants to show
 * with the necessary props.
 *
 * Instead of declaring all of the modal components to be rendered, this single component will
 * render what the user sets in the context and provide the necessary props from the user.
 */
const ModalRoot: React.FC<{}> = () => {
  const { component: Component, hideModal, modalProps } = React.useContext(ModalContext);
  return Component && <Component {...modalProps} hideModal={hideModal} onCancel={hideModal} />;
};

export default ModalRoot;
