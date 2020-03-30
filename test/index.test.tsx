import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// React multi modal
import { ModalProvider, ModalContext, ModalRoot } from '../src';

const userExample = {
  name: 'John Doe',
};

function ExampleOne({ isOpen, hideModal }) {
  return (
    isOpen && (
      <div>
        <div>Hello there, I am the modal of the first example.</div>
        <div>I am the body</div>
        <div>
          <button type="button" onClick={hideModal}>
            Hide me
          </button>
        </div>
      </div>
    )
  );
}

function ExampleTwo({ isOpen, hideModal, user }) {
  return (
    isOpen && (
      <div>
        <div>Hello {user.name}, I am the modal of the second example.</div>
        <div>I am the body</div>
        <div>
          <button type="button" onClick={hideModal}>
            Hide me
          </button>
        </div>
      </div>
    )
  );
}

function MainContent() {
  const { showModal, hideModal } = React.useContext(ModalContext);

  function showExampleOneModal() {
    showModal({
      component: ExampleOne,
    });
  }

  function showExampleTwoModal() {
    showModal({
      component: ExampleTwo,
      modalProps: {
        user: userExample,
      },
    });
  }

  return (
    <div>
      Welcome to the main content!
      <button onClick={showExampleOneModal}>show example one modal</button>
      <button onClick={showExampleTwoModal}>show example two modal</button>
      <button onClick={hideModal}>hide visible modal</button>
    </div>
  );
}

function renderComponent() {
  return render(
    <ModalProvider>
      <section>
        I am an example page!
        <MainContent />
        <ModalRoot />
      </section>
    </ModalProvider>
  );
}

it('should render correctly', () => {
  const { getByText } = renderComponent();

  expect(getByText('I am an example page!')).toBeInTheDocument();
  expect(getByText('show example one modal')).toBeInTheDocument();
  expect(getByText('show example two modal')).toBeInTheDocument();
});

it('should open a modal', () => {
  const { getByText } = renderComponent();

  fireEvent.click(getByText('show example one modal'));
  expect(getByText('Hello there, I am the modal of the first example.')).toBeInTheDocument();
});

it('should open different modals', () => {
  const { getByText, queryByText } = renderComponent();

  fireEvent.click(getByText('show example one modal'));
  expect(getByText('Hello there, I am the modal of the first example.')).toBeInTheDocument();
  fireEvent.click(getByText('Hide me'));
  expect(queryByText('Hello there, I am the modal of the first example.')).toBeNull();

  fireEvent.click(getByText('show example two modal'));
  expect(
    getByText(`Hello ${userExample.name}, I am the modal of the second example.`)
  ).toBeInTheDocument();
});
