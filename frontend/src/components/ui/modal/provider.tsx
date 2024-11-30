import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  SetStateAction,
  useContext,
  useState,
  Dispatch,
  useEffect, ReactNode,
} from "react";
import { useParams } from "react-router-dom";

export type ModalVariant = "default" | "destructive";

type OnClickModalProps = {
  params: any;
  client: QueryClient;
};

export type ModalProps = {
  onClick?: ({ params, client }: OnClickModalProps) => Promise<any>;
  description?: string;
  title?: string;
  variant?: string | ModalVariant;
  withSubmit?: boolean;
};

type ModalContextProps = Omit<ModalProps, "onClick"> & {
  onModalSubmit: () => Promise<any>;
};

type ModalContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  modalProps: ModalContextProps;
  setModalProps: Dispatch<SetStateAction<ModalContextProps>>;
};

export const defaultModalProps: ModalContextProps = {
  onModalSubmit: () => new Promise(() => {}),
  description: "",
  title: "",
  variant: "default",
  withSubmit: true,
};

const defaultModal = {
  open: false,
  setOpen: () => null,
  modalProps: defaultModalProps,
  setModalProps: () => null,
};

const ModalContext = createContext<ModalContext>(defaultModal);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState(defaultModalProps);

  return (
    <ModalContext.Provider value={{ open, setOpen, modalProps, setModalProps }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext() {
  return useContext(ModalContext);
}

export function useModal() {
  const { setModalProps, setOpen, open } = useModalContext();
  const params = useParams();
  const client = useQueryClient();

  useEffect(() => {
    if (!open) {
      setModalProps(defaultModalProps);
    }
  }, [open]);

  return {
    modal: (_props: ModalProps) => {
      setModalProps({
        onModalSubmit: () => {
          if (_props.onClick) {
            return _props.onClick({ params, client })
          }
          return new Promise(() => {})
        },
        ..._props,
        variant: _props.variant ? _props.variant : "default",
      });
      setOpen(true);
    },
  };
}