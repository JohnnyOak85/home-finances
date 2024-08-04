import { FC } from "react";
import ExpenseList from "./ExpenseList";

interface ExpenseGroupProps {
  categories: ExpenseCategory[];
  title: string;
}

const ExpenseGroup: FC<ExpenseGroupProps> = ({ categories, title }) => {
  return (
    <div className="group">
      <h2>{title}</h2>
      <div className="grid-container">
        {categories.map(({ expenses, name }, index) => (
          <ExpenseList key={index} title={name} expenses={expenses} />
        ))}
      </div>
    </div>
  );
};

export default ExpenseGroup;
