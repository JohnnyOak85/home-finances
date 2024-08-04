import { FC } from "react";
import Header from "../components/Header";
import ContributorsGroup from "../components/ContributorsGroup";
import { ExpenseProvider } from "../contexts/ExpenseContext";
import FeedbackMessage from "./FeedbackMessage";
import { useErrorContext } from "../contexts/ErrorContext";
import ExpensesSection from "../components/ExpensesSection";

const Home: FC = () => {
  const { error, setError } = useErrorContext();

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="Home">
      <ExpenseProvider>
        <Header />
        <ContributorsGroup />
        <ExpensesSection />
      </ExpenseProvider>
      {error && <FeedbackMessage message={error} onClose={clearError} />}
    </div>
  );
};

export default Home;
