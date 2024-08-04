import { FC, PropsWithChildren, useEffect } from "react";
import localization from "../localization/pt-PT";

type ModalProps = { title: string; onClose: VoidCallback } & PropsWithChildren;

const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
  const { close } = localization;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>{close}</button>
      </div>
    </div>
  );
};

export default Modal;
