# React Intersection Observer Kit

## [![npm version](https://badge.fury.io/js/react-intersection-observer-kit.svg)](https://badge.fury.io/js/react-intersection-observer-kit)

## Table of Contents

- [React Intersection Observer Kit](#react-intersection-observer-kit)

  - [Table of Contents](#table-of-contents)
  - [🌟 Overview](#🌟-overview)
  - [🎉 Features](#🎉-features)
  - [🚀 Installation](#🚀-installation)
    - [using npm](#using-npm)
    - [using yarn](#using-yarn)
  - [🔰 Usage](#🔰-usage)

    - [1. Import and use `ObserverProvider`](#1-import-and-use-observerprovider)
    - [2. Customize the `ObserverProvider`](#2-customize-the-observerprovider)
    - [3. Import and use `useRegister` and `useActiveElements`](#3-import-and-use-useregister-and-useactiveelements)
    - [4. Add extra behavior with Callbacks](#4-add-extra-behavior-with-callbacks)
    - [5. Using `useInViewport` for Independent Elements](#5-using-useinviewport-for-independent-elements)
    - [6. Customize `useInViewport`](#6-customize-useinviewport)

  - [📚 API Reference](#📚-api-reference)
    - [1. `Observer Provider` Component](#1-observer-provider-component)
      - [Props](#props)
    - [2. `useRegister` Hook](#2-useregister-hook)
      - [Parameters](#parameters)
      - [Returns](#returns)
    - [3. `useActiveElements` Hook](#3-useactiveelements-hook)
      - [Returns](#returns-1)
    - [4. `useInViewport` Hook](#4-useinviewport-hook)
      - [Parameters](#parameters-1)
      - [Returns](#returns-2)
  - [📁 Examples](#📁-examples)
    - [Animate Elements](#animate-elements)
    - [Lazy Loading Component](#lazy-loading-component)
    - [Lazy Fetching Data](#lazy-fetching-data)
  - [🤝 Contributing](#🤝-contributing)
    - [🚧 How to Contribute](#🚧-how-to-contribute)
      - [1. Fork the Repository](#1-fork-the-repository)
      - [2. Clone the Repository](#2-clone-the-repository)
      - [3.Create a Branch](#3-create-a-branch)
      - [4. Commit and push changes](#4-commit-and-push-changes)
      - [5. Open a Pull Request](#5-open-a-pull-request)
    - [👥 Ways to Contribute](#👥-ways-to-contribute)
      - [Report Bugs](#report-bugs)
      - [Request Features](#request-features)
      - [Provide Feedback](#provide-feedback)
  - [📄 License](#-license)

## 🌟 Overview

React library for using [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) in a React-friendly way. Contains hooks to determine if an element entered the viewport or not, and to tell what elements are currently in the viewport.

## 🎉 Features

- 👀 Detect if an element has entered or left the viewport.
- 🔭 Track which elements are currently in the viewport in real-time.
- 🤙 Execute customizable callbacks when an element enters or exits the viewport.
- ⚙️ Customize the Intersection Observer API options.
- 🛃 Implement your custom conditions to determine element visibility.
- ⚡️ Optimized performance with minimal re-renders, components render only when necessary.
- 🛠️ Crafted with TypeScript, ensuring type safety.
- 🤏 Small size, does not need any extra dependencies.

## 🚀 Installation

Install `react-intersection-observer-kit`

#### using npm

```bash
npm install react-intersection-observer-kit
```

#### using yarn

```bash
yarn add react-intersection-observer-kit
```

## 🔰 Usage

Getting started with React Intersection Observer Kit is a straightforward process. Follow the steps below to integrate the library into your React application and leverage the power of the Intersection Observer API. Whether you want to track elements entering the viewport, customize observer options, or implement callbacks for specific behaviors, this section guides you through the essential usage scenarios. Dive into the examples and start observing elements easily.

### Import `ObserverProvider`

In your React application, you'll need to wrap the components that will use the Intersection Observer API hooks with the ObserverProvider. This provider is responsible for observing elements, updating the active elements' state, and executing the activity listeners.

#### 1. Import and use `ObserverProvider`

```jsx
import { ObserverProvider } from 'react-intersection-observer-kit';
import ExampleComponent from './ExampleComponent';

function App() {
  return (
    <ObserverProvider>
      {/* Your components that use the Intersection Observer API hooks go here */}
      <ExampleComponent />
    </ObserverProvider>
  );
}

export default App;
```

#### 2. Customize the `ObserverProvider`

You can customize the Intersection Observer API by using the optional options prop to override the default options, and the optional activeCondition callback to override the default condition for changing the element's active state:

```jsx
import { ObserverProvider } from 'react-intersection-observer-kit';
import ExampleComponent from './ExampleComponent';

function App() {
  return (
    <ObserverProvider
      options={{
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }}
      activeCondition={(entry) => entry.isIntersecting}
    >
      {/* Your components that use the Intersection Observer API hooks go here */}
      <ExampleComponent />
    </ObserverProvider>
  );
}

export default App;
```

#### 3. Import and use `useRegister` and `useActiveElements`

Within the components that you want to observe, use the useRegister hook to register elements and the useActiveElements hook to get information about the currently active elements.

```jsx
import { useRegister, useActiveElements } from 'react-intersection-observer-kit';

function ExampleComponent() {
  // Register the element to be observed
  const ref = useRegister('elementId');

  // Get currently active elements IDs
  const activeElements = useActiveElements();

  return (
    {/*Add the useRegister returned ref as ref for the element you want it to be observed*/}
    <div ref={ref}>
        {/*Component Content*/}
    </div>);
}

export default ExampleComponent;
```

#### 4. Add extra behavior with Callbacks

You can add extra behavior for each element when its active state changes by providing callbacks

```jsx
import { useRegister, useActiveElements } from 'react-intersection-observer-kit';

function ExampleComponent() {
  // Register the element to be observed
  const ref = useRegister('elementId', {
    onEntryActive: (entry) => {
      // Your custom logic when the element's state changes to Active
    },
    onEntryInactive: (entry) => {
      // Your custom logic when the element's state changes to Inactive
    },
  });

  return <div ref={ref}>{/* Component Content */}</div>;
}

export default ExampleComponent;
```

#### 5. Using `useInViewport` for Independent Elements

If you need to observe a single element or a few elements which are independent of each other, you can use the `useInViewport` hook, which does not need to be inside `ObserverProvider`.

##### You can use this hook for lazy loading images for example!

```jsx
import { useInViewport } from 'react-intersection-observer-kit';

function LazyImage({ src, alt }) {
  const [ref, inViewport] = useInViewport();

  return <img ref={ref} src={inViewport ? src : ''} alt={alt} style={{ opacity: inViewport ? 1 : 0 }} />;
}

export default LazyImage;
```

```jsx
// App.jsx
import { LazyImage } from './LazyImage';

function App() {
  return (
    <div>
      <LazyImage src='https://example.com/image-name.jpg' alt='Lazy Image' />
    </div>
  );
}
```

#### 6. Customize `useInViewport`

You can customize `useInViewport` also by overriding the observerOptions or inViewCondition

```jsx
// ExampleComponent.jsx
import { useInViewport } from 'react-intersection-observer-kit';

function ExampleComponent() {
  const [ref, inViewport] = useInViewport({
    inViewCondition: (entry) => entry.isIntersecting,
    observerOptions: { root: null, rootMargin: '0px', threshold: 0.5 },
  });

  return <div ref={ref}>{/* Component Content */}</div>;
}
```

## 📚 API Reference

### 1. `Observer Provider` Component

#### Props

| Name              | Type                                                       | Default                                             | Description                                                                     |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| `children`        | `ReactNode[] \| ReactNode` (required)                      | -                                                   | Components requiring access to the `useRegister` and `useActiveElements` Hooks. |
| `options`         | `IntersectionObserverInit` (optional)                      | `{ root: null, rootMargin: '0px', threshold: 0.5 }` | Options for overriding the default Intersection Observer API settings.          |
| `activeCondition` | `(entry: IntersectionObserverEntry) => boolean` (optional) | `entry => entry.isIntersecting`                     | Callback to determine when to update the active elements or not.                |

### 2. `useRegister` Hook

- Note: `useRegister` is generic. In TypeScript, you can override the default type for the ref object by specifying the type when calling the hook (e.g., `useRegister<HTMLDivElement>()`).

#### Parameters

| param             | Type                                                    | Default | Description                                                                                                             |
| ----------------- | ------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `id`              | `string`                                                | -       | Optional ID to assign to the registered element. Must be specified if the element does not have an ID to work properly. |
| `onEntryActive`   | `(entry: IntersectionObserverEntry) => void` (optional) | -       | Callback invoked when the element's `activeCondition` becomes true.                                                     |
| `onEntryInactive` | `(entry: IntersectionObserverEntry) => void` (optional) | -       | Callback invoked when the element's `activeCondition` becomes false.                                                    |

#### Returns

`RefObject<HTMLElement>`: Reference to assign to the element that needs observation.

### 3. `useActiveElements` Hook

#### Returns

`Array<string>`: Array containing the IDs of currently active elements.

### 4. `useInViewport` Hook

#### Parameters

| Name              | Type                                            | Default                                             | Description                                                                |
| ----------------- | ----------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| `observerOptions` | `IntersectionObserverInit` (optional)           | `{ root: null, rootMargin: '0px', threshold: 0.5 }` | Options for overriding the default settings for Intersection Observer API. |
| `inViewCondition` | `(entry: IntersectionObserverEntry) => boolean` | `entry => entry.isIntersecting`                     | Callback to determine whether to update the `inViewport` state.            |

#### Returns

`[RefObject<T>, boolean]`: Tuple containing the element ref and a boolean indicating if the element is in the viewport. Use the returned ref to start observing an element.

## 📁 Examples

Explore these practical examples to see how React Intersection Observer Kit can help you in different scenarios. You can find example implementations in the `examples` folder of the package repository.

### [Animate Elements](https://wardkhaddour.github.io/react-intersection-observer-kit/)

Animate elements when they enter the viewport using React Intersection Observer Kit.

### [Lazy Loading Component](https://wardkhaddour.github.io/react-intersection-observer-kit/#/lazy-load)

Implement lazy loading for React components to optimize performance.

### [Lazy Fetching Data](https://wardkhaddour.github.io/react-intersection-observer-kit/#/lazy-fetch)

Lazy fetching of data when a component becomes visible in the viewport.

## 🤝 Contributing

We welcome contributions from the community! If you'd like to contribute to the development of React Intersection Observer Kit, please follow these guidelines:

### 🚧 How to Contribute

#### 1. **Fork the Repository:**

- Fork this [repository](https://github.com/WardKhaddour/react-intersection-observer-kit.git) to your GitHub account.

#### 2. **Clone the Repository:**

```bash
git clone https://github.com/WardKhaddour/react-intersection-observer-kit.git
```

#### 3. **Create a Branch:**

Create a new branch for your changes.

```bash
git checkout -b feature/feature-name
```

#### 4. **Commit and push changes**

```bash
git commit -m "Add your descriptive message here"
```

```bash
git push origin feature/your-feature-name
```

#### 5. **Open a Pull Request**

Open a pull request against the `main` branch of the original repository.

### 👥 Ways to Contribute

#### Report Bugs:

If you encounter a bug, please open an issue with a detailed description.

#### Request Features:

Feel free to open an issue to suggest new features or improvements.

#### Provide Feedback:

Share your experience using the library and provide feedback on what you find helpful or challenging.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
