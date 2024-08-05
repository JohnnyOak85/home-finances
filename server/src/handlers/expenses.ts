import { notFound, validationError } from "@/errors/errors";
import { fetchDocument, listDocuments, saveDocument } from "@/tools/orm";
import { getFormattedDate } from "@/tools/formatters";
import { isValidDate } from "@/validation/expense";

const sanitizeDate = (date?: string) => {
  if (!date) {
    date = date || getFormattedDate();
  }

  if (!isValidDate(date)) {
    throw validationError(`Invalid date format ${date}. Should be YYYY_MM`);
  }

  return date;
};

const isPresent = (date: string) => {
  return date === getFormattedDate();
};

const isBeforeRecords = (date: string) => {
  if (isPresent(date)) {
    return false;
  }

  const files = listDocuments();

  return !files.includes(date);
};

const getExpenseTemplate = (): ExpenseDoc => {
  const doc = fetchDocument<ExpenseDoc>("template");

  if (!doc) {
    throw notFound("Template document not found");
  }

  return doc;
};

const getExpenses = (date?: string) => {
  try {
    const sanitizedDate = sanitizeDate(date);
    let doc = fetchDocument<ExpenseDoc>(sanitizedDate);

    if (isBeforeRecords(sanitizedDate)) {
      throw validationError("Selected date is before recorded data");
    }

    if (!doc) {
      doc = getExpenseTemplate();
      saveDocument(sanitizedDate, doc);
    }

    return doc;
  } catch (error) {
    throw error;
  }
};

const updateExpenses = ({ category, expense }: ExpenseBody, date?: string) => {
  try {
    const sanitizedDate = sanitizeDate(date);
    let doc = fetchDocument<ExpenseDoc>(sanitizedDate);

    if (!doc) {
      doc = getExpenseTemplate();
    }

    const index = doc.findIndex(({ name }) => category === name);

    if (index === -1) {
      throw validationError(`Category does not exist: ${category}`);
    }

    doc[index].expenses = [...doc[index].expenses, expense];

    saveDocument(sanitizedDate, doc);
  } catch (error) {
    throw error;
  }
};

export { getExpenses, updateExpenses };
