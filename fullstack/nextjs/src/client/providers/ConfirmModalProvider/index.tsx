"use client";

import { Modal } from "antd";
import { createContext, ReactNode, useState } from "react";

export type ConfirmModalPayload = {
  title?: string;
  text?: string;
  onOk?: () => Promise<void>;
  okText?: string;
  onCancel?: () => void;
  cancelText?: string;
  danger?: boolean;
};

export const ConfirmModalContext = createContext<{
  confirmModal: ({
    title,
    text,
    onOk,
    okText,
    onCancel,
    cancelText,
    danger,
  }: ConfirmModalPayload) => void;
}>({
  confirmModal: () => {},
});

interface ConfirmModalProviderProps {
  children: ReactNode;
}

export default function ConfirmModalProvider({
  children,
}: ConfirmModalProviderProps) {
  const [show, setShow] = useState(false);
  const [modalPayload, setModalPayload] = useState<ConfirmModalPayload>({});
  const [loading, setLoading] = useState(false);

  const confirmModal = ({
    title,
    text,
    onOk,
    okText = "Ok",
    onCancel,
    cancelText = "Cancel",
    danger,
  }: ConfirmModalPayload) => {
    setShow(true);
    setModalPayload({
      title,
      text,
      onOk,
      okText,
      onCancel,
      cancelText,
      danger,
    });
  };

  return (
    <ConfirmModalContext.Provider value={{ confirmModal }}>
      {children}
      <Modal
        centered
        open={show}
        onCancel={() => {
          if (modalPayload.onCancel) modalPayload.onCancel();
          setShow(false);
        }}
        cancelText={modalPayload.cancelText}
        onOk={async () => {
          setLoading(true);
          if (modalPayload.onOk) await modalPayload.onOk();
          setLoading(false);
          setShow(false);
        }}
        okText={modalPayload.okText}
        okButtonProps={{
          loading: loading,
          danger: modalPayload.danger,
        }}
      >
        <div className="flex w-full flex-col">
          <h3 className="!mb-4 text-2xl font-semibold">{modalPayload.title}</h3>
          <p className="text-base font-normal">{modalPayload.text}</p>
        </div>
      </Modal>
    </ConfirmModalContext.Provider>
  );
}
