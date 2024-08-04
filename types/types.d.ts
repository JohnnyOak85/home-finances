type Expense = { amount: number; name: string };
type ExpenseCategory = { expenses: Expense[]; name: string; shared: boolean };
type ExpenseDoc = ExpenseCategory[];

type ExpensePayload = ExpenseDoc;
type ExpenseBody = { category: string; expense: Expense };
type ExpenseQuery = { date?: string };

type Contributor = {
  debts?: Expense[];
  name: string;
  savings?: number;
  wage: number;
};
type ContributorDoc = Contributor[];

type ContributorPayload = ContributorDoc;
type ContributorBody = Contributor;

type ExpenseRecord = { record: string };

type VoidCallback = () => void;
