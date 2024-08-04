import { FC } from "react";
import ExpenseItem from "./ExpenseItem";
import localization from "../localization/pt-PT";

type DebtListProps = { debtList: Expense[]; totalDebt: number };

const DebtList: FC<DebtListProps> = ({ debtList, totalDebt }) => {
  const { debts, total } = localization;

  return (
    <div>
      <h4>{debts}</h4>
      {debtList.map(({ name, amount }, index) => (
        <ExpenseItem key={index} name={name} amount={amount} />
      ))}
      <hr></hr>
      <ExpenseItem name={total} amount={totalDebt} />
    </div>
  );
};

export default DebtList;
