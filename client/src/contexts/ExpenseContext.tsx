import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useDate from "../hooks/useDate";
import { getDocument, updateDocument } from "../tools/api";
import { useErrorContext } from "./ErrorContext";

type ExpenseContextType = {
  sharedExpenses: ExpenseDoc;
  personalExpenses: ExpenseDoc;
  totalExpense: number;
  date: string;
  isCurrentMonth: boolean;
  isEarliestRecord: boolean;
  changeMonth: (forward: boolean) => void;
  updateExpenses: (category: string, expense: Expense) => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sharedExpenses, setSharedExpenses] = useState<ExpenseDoc>([]);
  const [personalExpenses, setPersonalExpenses] = useState<ExpenseDoc>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const { date, isCurrentMonth, isEarliestRecord, changeMonth } = useDate();
  const { setError } = useErrorContext();

  const getExpenses = useCallback(async () => {
    try {
      const expenseDoc = await getDocument<ExpenseDoc>(`expenses?date=${date}`);

      setSharedExpenses(expenseDoc.filter((category) => category.shared));
      setPersonalExpenses(expenseDoc.filter((category) => !category.shared));

      setTotalExpense(
        expenseDoc
          .filter(({ shared }) => shared)
          .map(({ expenses }) => expenses.map(({ amount }) => amount))
          .flat()
          .reduce((sum, amount) => sum + amount, 0)
      );
    } catch (error: any) {
      if (error.isAppError) {
        setError(error.error_description.message);
      } else {
        setError(error.message);
      }
    }
  }, [date, setError]);

  const updateExpenses = useCallback(
    (category: string, expense: Expense) => {
      updateDocument(`expenses?date=${date}`, { category, expense });
      getExpenses();
    },
    [getExpenses, date]
  );

  useEffect(() => {
    getExpenses();
  }, [setError, date, getExpenses]);

  return (
    <ExpenseContext.Provider
      value={{
        sharedExpenses,
        personalExpenses,
        totalExpense,
        date,
        isCurrentMonth,
        isEarliestRecord,
        changeMonth,
        updateExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpenseContext must be used within a ExpenseProvider");
  }

  return context;
};
