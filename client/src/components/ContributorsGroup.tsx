import { FC, useEffect, useState } from "react";
import ContributorEntry from "./ContributorEntry";
import { getDocument } from "../tools/api";
import { useExpenseContext } from "../contexts/ExpenseContext";

const ContributorsGroup: FC = () => {
  const { totalExpense } = useExpenseContext();
  const [contributors, setContributors] = useState<ContributorDoc>([]);
  const [totalWage, setTotalWage] = useState(0);

  useEffect(() => {
    const getContributors = async () => {
      const contributorsDoc = await getDocument<ContributorDoc>("contributors");

      setContributors(contributorsDoc);
      setTotalWage(
        contributorsDoc.reduce(
          (sum, { savings = 0, wage }) => sum + (wage - savings),
          0
        )
      );
    };

    getContributors();
  }, []);

  return (
    <div className="group">
      <div className="grid-container">
        {contributors.map((contributor, index) => (
          <ContributorEntry
            contributor={contributor}
            totalExpense={totalExpense}
            totalWage={totalWage}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ContributorsGroup;
