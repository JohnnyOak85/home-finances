import { FC, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import localization from "../localization/pt-PT";
import ExpenseForm from "./ExpenseForm";

interface ExpenseListProps {
  title: string;
  expenses: Expense[];
}

const ExpenseList: FC<ExpenseListProps> = ({ title, expenses }) => {
  const [formActive, setFormActive] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const { total } = localization;

  useEffect(() => {
    setTotalAmount(expenses.reduce((sum, { amount }) => sum + amount, 0));
  }, [expenses]);

  const openForm = () => {
    setFormActive(true);
  };

  const closeForm = () => {
    setFormActive(false);
  };

  return (
    <>
      <div className="list" onClick={openForm}>
        <h3>{title}</h3>
        {expenses.map(({ name, amount }, index) => (
          <ExpenseItem key={index} name={name} amount={amount} />
        ))}
        <hr></hr>
        <ExpenseItem name={total} amount={totalAmount} />
      </div>
      {formActive && <ExpenseForm category={title} onClose={closeForm} />}
    </>
  );
};

export default ExpenseList;
