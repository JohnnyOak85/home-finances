import { FC } from "react";
import localization from "../localization/pt-PT";
import Modal from "./Modal";

type FeedbackMessageProps = { message: string; onClose: VoidCallback };

const FeedbackMessage: FC<FeedbackMessageProps> = ({ message, onClose }) => {
  const { error } = localization;

  return (
    <Modal title={error} onClose={onClose}>
      {<p>{message}</p>}
    </Modal>
  );
};

export default FeedbackMessage;
