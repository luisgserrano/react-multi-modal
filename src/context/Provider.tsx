import React from 'react';

// Interfaces
import { ProviderState, ShowModalParams } from '../interfaces';

export const ModalContext = React.createContext<ProviderState>({
  component: null,
  showModal: () => {},
  hideModal: () => {},
  modalProps: {},
});

class ModalProvider extends React.Component<{}, ProviderState> {
  /**
   * By passing the component as parameter to the state of the context store, we can trigger a
   * re-render and show in the modalRoot component that is a consumer of this store.
   *
   * With this approach, we can render multiple components in one place, one at the time, with only
   * one function to manage the visibility of the modal, having multiple modals in one page.
   */
  showModal = ({ component, modalProps = {} }: ShowModalParams) => {
    this.setState({
      component,
      modalProps: { ...modalProps, visible: true },
    });
  };

  /**
   * To be able to animate the modal enter/leave state, the component can't be null because react
   * would render null on the leave state.
   *
   * Instead of setting the component state to null to hide the modal component, we change the
   * visible prop so the modal implementation handle and animate the leave state, if the user wants.
   */
  hideModal = () => {
    this.setState(prevState => ({
      modalProps: { ...prevState.modalProps, visible: false },
    }));
  };

  state = {
    component: null,
    modalProps: {},
    showModal: this.showModal,
    hideModal: this.hideModal,
  };

  render() {
    return <ModalContext.Provider value={this.state}>{this.props.children}</ModalContext.Provider>;
  }
}

export default ModalProvider;
