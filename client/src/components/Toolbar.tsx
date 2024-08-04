import { FC } from "react";

import { ReactComponent as LeftArrow } from "../assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "../assets/arrow-right.svg";
import { useExpenseContext } from "../contexts/ExpenseContext";
import { formatDate } from "../tools/formatter";

const Toolbar: FC = () => {
  const { isCurrentMonth, isEarliestRecord, changeMonth, date } =
    useExpenseContext();

  const handleLeftArrow = () => {
    changeMonth(false);
  };

  const handleRightArrow = () => {
    changeMonth(true);
  };

  return (
    <div className="arrow-bar">
      {!isEarliestRecord && (
        <button className="arrow-button" onClick={handleLeftArrow}>
          <LeftArrow />
        </button>
      )}
      <h3>{formatDate(date)}</h3>
      {!isCurrentMonth && (
        <button className="arrow-button" onClick={handleRightArrow}>
          <RightArrow />
        </button>
      )}
    </div>
  );
};

export default Toolbar;
