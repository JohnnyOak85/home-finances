import { useState, useCallback, useEffect } from "react";
import { getDocument } from "../tools/api";

const formatDateToString = (date: Date): string =>
  date.toISOString().slice(0, 7).replace("-", "_");
const getCurrentMonth = (): string => formatDateToString(new Date());

const useDate = () => {
  const [isEarliestRecord, toggleIsEarliestRecord] = useState(false);
  const [date, setDate] = useState<string>(getCurrentMonth());
  const isCurrentMonth = date === getCurrentMonth();

  const changeMonth = useCallback(
    (forward: boolean) => {
      if ((isCurrentMonth && forward) || (isEarliestRecord && !forward)) {
        return;
      }

      setDate((prevDate) => {
        const [year, month] = prevDate.split("_").map(Number);
        const adjustedMonth = month + (forward ? 1 : -1);
        const newDate = new Date(year, adjustedMonth - 1, 1);
        return formatDateToString(newDate);
      });
    },
    [isCurrentMonth, isEarliestRecord]
  );

  useEffect(() => {
    const getEarliestRecord = async () => {
      const { record } = await getDocument<ExpenseRecord>("records/earliest");

      toggleIsEarliestRecord(record === date);
    };

    getEarliestRecord();
  }, [date]);

  return { date, isCurrentMonth, isEarliestRecord, changeMonth };
};

export default useDate;
