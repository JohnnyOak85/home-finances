import localization from "../localization/pt-PT";
import Modal from "./Modal";
import useExpenseForm from "../hooks/useExpenseForm";
import { FC } from "react";

type ExpenseFormProps = { category: string; onClose: VoidCallback };

const ExpenseForm: FC<ExpenseFormProps> = ({ category, onClose }) => {
  const {
    validForm,
    rawInputs,
    handleInputChange,
    handleSubmit,
    amountInputRef,
    nameInputRef,
  } = useExpenseForm(category);
  const { amount, name, save } = localization;

  return (
    <Modal title={category} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label>{name} </label>
        <input
          ref={nameInputRef}
          id="name"
          name="name"
          type="text"
          onChange={handleInputChange}
          value={rawInputs.name}
        />
        <br />
        <br />
        <label>{amount} </label>
        <input
          ref={amountInputRef}
          id="amount"
          name="amount"
          type="text"
          onChange={handleInputChange}
          value={rawInputs.amount}
          required
        />
        <br />
        <button className="submit" type="submit" disabled={!validForm}>
          {save}
        </button>
      </form>
    </Modal>
  );
};

export default ExpenseForm;
