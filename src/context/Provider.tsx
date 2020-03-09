import React from 'react';

// Interfaces
import { ComponentProps, ProviderState, ShowModalParams } from '../interfaces';

export const ModalContext = React.createContext<ProviderState>({
  component: null,
  showModal: () => {},
  hideModal: () => {},
  modalProps: {},
});

class ModalProvider extends React.Component<{}, ProviderState> {
  /**
   * The way to show the modal component is by passing the component to the context and manage the
   * visible prop. This way we can have multiple components being rendered in the same page but
   * only one rendered at the same time.
   *
   * With this approach, the show and hide functions will only be related to the rendered component.
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
   * visible prop so the modal implementation handle and animate the leave state.
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
