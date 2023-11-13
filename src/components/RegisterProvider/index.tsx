import { RegisterContext } from '../../contexts';
import { ReactNode, RefObject } from 'react';

type Props = {
  children: ReactNode[] | ReactNode;
  registerElement: (ref: RefObject<HTMLElement>) => void;
  unregisterElement: (ref: RefObject<HTMLElement>) => void;
};

/**
 * Provider to get access to register and unregister functions, to add and remove entries from Visible Elements Provider.
 * @param {ReactNode | ReactNode []} [props.children]  Components which needs access to the useRegister Hook.
 * @param {(ref: RefObject<HTMLElement>) => void} [props.registerElement] function to handle registering new element.
 * @param {(ref: RefObject<HTMLElement>) => void} [props.unregisterElement] function to handle un-registering element.
 * @returns [ReactNode] Register Provider
 */

function RegisterProvider({ children, registerElement, unregisterElement }: Props): ReactNode {
  return (
    <RegisterContext.Provider
      value={{
        register: registerElement,
        unregister: unregisterElement,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;
