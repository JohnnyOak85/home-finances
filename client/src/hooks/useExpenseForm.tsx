import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import localization from "../localization/pt-PT";
import useDebounce from "../hooks/useDebounce";
import { formatCurrencyFromString } from "../tools/formatter";
import { useExpenseContext } from "../contexts/ExpenseContext";

type ExpenseState = { amount: number | null; name: string | null };
type RawInputs = { amount: string; name: string };

const nullExpense = { amount: null, name: null };
const rawExpense = { amount: "", name: "" };

const useExpenseForm = (category: string) => {
  const { updateExpenses } = useExpenseContext();
  const [validForm, setValidForm] = useState(false);
  const [expense, setExpense] = useState<ExpenseState>(nullExpense);
  const [rawInputs, setRawInputs] = useState<RawInputs>(rawExpense);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { invalidAmount, invalidName } = localization;

  const validateName = useDebounce((name: string) => {
    if (!name.trim()) {
      setValidForm(false);
      setRawInputs((prev) => ({ ...prev, name: "" }));
      setExpense((prev) => ({ ...prev, name: "" }));

      if (nameInputRef.current) {
        nameInputRef.current.setCustomValidity(invalidName);
        nameInputRef.current.reportValidity();
      }

      return;
    }

    setExpense((prev) => ({ ...prev, name }));
    setValidForm(!!expense.amount && !!name);
    setRawInputs((prev) => ({ ...prev, name }));
  }, 500);

  const validateAmount = useDebounce((value: string) => {
    const amount = formatCurrencyFromString(value);

    if (isNaN(amount) || amount <= 0) {
      setValidForm(false);
      setRawInputs((prev) => ({ ...prev, amount: "" }));
      setExpense((prev) => ({ ...prev, amount: 0 }));

      if (amountInputRef.current) {
        amountInputRef.current.setCustomValidity(invalidAmount);
        amountInputRef.current.reportValidity();
      }

      return;
    }

    setExpense((prev) => ({ ...prev, amount }));
    setValidForm(!!amount && !!expense.name);
    setRawInputs((prev) => ({ ...prev, amount: `${amount}` }));
  }, 500);

  const handleInputChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      target.setCustomValidity("");

      const { name, value } = target;

      setRawInputs((prev) => ({ ...prev, [name]: value }));

      if (name === "name") {
        validateName(value);
      }

      if (name === "amount") {
        validateAmount(value);
      }
    },
    [validateName, validateAmount]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!expense.name || !expense.amount || isNaN(expense.amount)) {
        return;
      }

      updateExpenses(category, expense as Expense);
      setExpense(nullExpense);
      setRawInputs(rawExpense);
    },
    [category, expense, updateExpenses]
  );

  return {
    validForm,
    rawInputs,
    handleInputChange,
    handleSubmit,
    amountInputRef,
    nameInputRef,
  };
};

export default useExpenseForm;
