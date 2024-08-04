import { FC, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import localization from "../localization/pt-PT";
import DebtList from "./DebtList";

interface ContributorEntryProps {
  contributor: Contributor;
  totalExpense: number;
  totalWage: number;
}

const ContributorEntry: FC<ContributorEntryProps> = ({
  contributor,
  totalExpense,
  totalWage,
}) => {
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);
  const { contribution, salary } = localization;
  const { name, wage, debts = [], savings = 0 } = contributor;

  useEffect(() => {
    if (debts.length) {
      setTotalDebt(debts.reduce((sum, { amount }) => sum + amount, 0));
    }

    const actualWage = wage > savings ? wage - savings : wage;
    const percentage = actualWage / totalWage;

    setTotalContribution(totalExpense * percentage + totalDebt);
  }, [debts, savings, totalDebt, totalExpense, totalWage, wage]);

  return (
    <div className="list">
      <h3>{name}</h3>
      <ExpenseItem name={salary} amount={wage} />
      {!!savings && <ExpenseItem name="Poupança" amount={savings} />}
      <ExpenseItem name={contribution} amount={totalContribution} />
      {!!debts.length && <DebtList debtList={debts} totalDebt={totalDebt} />}
    </div>
  );
};

export default ContributorEntry;
