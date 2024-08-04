import { FC } from "react";
import { useExpenseContext } from "../contexts/ExpenseContext";
import ExpenseGroup from "./ExpenseGroup";
import localization from "../localization/pt-PT";

const ExpensesSection: FC = () => {
  const { sharedExpenses, personalExpenses } = useExpenseContext();
  const { shared, personal } = localization;

  return (
    <div>
      <ExpenseGroup categories={sharedExpenses} title={shared} />
      <ExpenseGroup categories={personalExpenses} title={personal} />
    </div>
  );
};

export default ExpensesSection;
