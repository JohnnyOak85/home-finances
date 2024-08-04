import {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";

type ErrorContextType = {
  error: string | null;
  setError: (error: string | null) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useExpenseContext must be used within a ExpenseProvider");
  }

  return context;
};
