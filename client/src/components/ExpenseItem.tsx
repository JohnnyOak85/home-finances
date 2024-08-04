import { FC } from "react";
import { formatCurrency } from "../tools/formatter";

const ExpenseItem: FC<Expense> = ({ name, amount }) => {
  return (
    <div className="expense-item">
      <span className="expense-name">{name}</span>
      <span className="expense-amount">{formatCurrency(amount)}</span>
    </div>
  );
};

export default ExpenseItem;
