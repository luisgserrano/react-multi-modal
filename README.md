# React multi modal library

## Installation

Install React multi modal as a dependency using `npm` or `yarn`

### NPM

`$ npm install react-multi-modal`

### Yarn

`$ yarn add react-multi-modal`

## Import React multi modal:

```javascript
import { ModalProvider, ModalContext, ModalRoot } from 'react-multi-modal';
```

## Peer dependencies

- React 16.8.0 (hooks)

## Concept - how it works

React multi modal was created to help the developer manage multiple modals in one page.

The common case is to create a variable in the state to save the visibility and methods to show and hide a modal. The problem is when we have multiple modals in one page and we need to handle the visibility of all modals. The consequence is we end up duplicating a lot of code.

An example:

```javascript
import React from 'react';

// Components
import ModalOne from './ModalOne';
import ModalTwo from './ModalTwo';

function App() {
  const [modalOneIsOpen, setModalOneIsOpen] = React.useState(false);
  const [modalTwoIsOpen, setModalTwoIsOpen] = React.useState(false);

  function showModalOne() {
    setModalOneIsOpen(true);
  }

  function showModalTwo() {
    setModalTwoIsOpen(true);
  }

  function hideModalOne() {
    setModalOneIsOpen(false);
  }

  function hideModalTwo() {
    setModalTwoIsOpen(false);
  }

  return (
    <div>
      Welcome to this test!
      <button onClick={showModalOne}>show modal one</button>
      <button onClick={showModalTwo}>show modal two</button>
      <ModalOne isOpen={modalOneIsOpen} hideModal={hideModalOne} />
      <ModalTwo isOpen={modalTwoIsOpen} hideModal={hideModalTwo} />
    </div>
  );
}
```

React multi modal is based on the react context API and it gives a `Provider` component, a `context` object and a `root` component where all the modals will be rendered.

### ModalRoot component

The `ModalRoot` component will render any component you pass in the `showModal` method and it acts like a placeholder. As such, you can render this component wherever you want in the tree, as long it's under the provider.

### Provider component

This component abstracts the definition of the context provider and uses the provider pattern. The logic behind showing/hiding a modal is in this component.

You should put this component as high as you need in the tree (don't worry, I'll show you full examples at the end). Example:

```javascript
import { ModalProvider, ModalRoot } from 'react-multi-modal';

function App() {
  return (
    <div>
      <h1>I am the title of the page</h1>
      <ModalProvider>
        <ComponentCallingMultipleModals />
        <ModalRoot />
      </ModalProvider>
    </div>
  );
}
```

### Context object

The `context` object provides some state and methods to manage a modal, as such:

#### showModal({ component, modalProps })

This method is responsible to change the visibility of a given modal component. It receives two arguments:

#### component

It's the modal component you want to show. Example:

```javascript
import ExampleModal from './ExampleModal';

showModal({ component: ExampleModal });
```

#### modalProps

The `modalProps` parameter should be an `object`. Besides the props that the library already provides to handle the visibility of the modal (`isOpen`, `hideModal`), the `modalProps` object will be destructured as props into your modal component. This approach makes it possible to pass whatever props you need to your custom modal component. Example:

**Any component that you'll pass to the showModal method will have automatically `isOpen`, `hideModal` as props.**

- **isOpen:** boolean value that holds the visibility state of the modal
- **hideModal:** method to hide the current visibile modal

```javascript
function ExampleModal({ isOpen, hideModal, user, modalTitle }) {
  return (
    isOpen && (
      <div>
        <div>{modalTitle}</div>
        <div>{user.name}</div>
      </div>
    )
  );
}

// in some component
showModal({
  component: ExampleModal,
  modalProps: {
    user: {
      name: 'John Doe',
    },
    modalTitle: 'Edit user settings',
  },
});
```

## Notes

Since you can't use the `useContext` hook in the same component where you use the `ModalProvider` component, we provide you with the `modalContext` so you can define your own consumer.

If you can't separate the `ModalProvider` from the consumers, you can still do:

```javascript
import { ModalProvider, ModalContext, ModalRoot } from 'react-multi-modal';

// Components
import ModalOne from './ModalOne';
import ModalTwo from './ModalTwo';

function App() {
  return (
    <ModalProvider>
      <ModalContext.Consumer>
        {({ showModal, hideModal }) => (
          <>
            Welcome to this test!
            <button onClick={() => showModal({ component: ModalOne })}>show modal</button>
            <button onClick={() => showModal({ component: ModalTwo })}>show modal</button>
            <button onClick={hideModal}>hide modal</button>
            <ModalRoot />
          </>
        )}
      </ModalContext.Consumer>
    </ModalProvider>
  );
}
```

## Full examples

### Using a Context.Consumer

```javascript
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';

function ExampleOne({ isOpen, hideModal }) {
  return (
    isOpen && (
      <div>
        <div>Hello there, I am a modal</div>
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

function ExampleTwo({ isOpen, user }) {
  return isOpen && <div>{user.name}</div>;
}

function App() {
  function showExampleOneModal(showModal) {
    showModal({
      component: ExampleOne,
    });
  }

  function showExampleTwoModal(showModal) {
    showModal({
      component: ExampleTwo,
      modalProps: {
        user: {
          name: 'John Doe',
        },
      },
    });
  }

  return (
    <ModalProvider>
      <ModalContext.Consumer>
        {({ showModal, hideModal }) => (
          <>
            Welcome to this test!
            <button onClick={() => showExampleOneModal(showModal)}>show example one modal</button>
            <button onClick={() => showExampleTwoModal(showModal)}>show example two modal</button>
            <button onClick={hideModal}>hide visible modal</button>
            <ModalRoot />
          </>
        )}
      </ModalContext.Consumer>
    </ModalProvider>
  );
}
```

### Using useContext hook

```javascript
import React from 'react';
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';

function ExampleOne({ isOpen, hideModal }) {
  return (
    isOpen && (
      <div>
        <div>Hello there, I am a modal</div>
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

function ExampleTwo({ isOpen, user }) {
  return isOpen && <div>{user.name}</div>;
}

function Sidebar() {
  return <div>I am a sidebar</div>;
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
        user: {
          name: 'John Doe',
        },
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

function App() {
  return (
    <ModalProvider>
      <section>
        I am an example page!
        <Sidebar />
        <MainContent />
        <ModalRoot />
      </section>
    </ModalProvider>
  );
}
```
