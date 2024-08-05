import { notFound } from "@/errors/errors";
import { listDocuments } from "@/tools/orm";
import { getFormattedDate } from "@/tools/formatters";

const getEarliestRecord = (): ExpenseRecord => {
  try {
    const records = listDocuments();

    if (!records.length) {
      throw notFound("No records in the database");
    }

    const dates = records
      .map((date) => new Date(date.replace("_", "-")))
      .filter((date) => !isNaN(date.getTime()));

    const earliestDate = new Date(
      Math.min(...dates.map((date) => date.getTime()))
    );

    return { record: getFormattedDate(earliestDate) };
  } catch (error) {
    throw error;
  }
};

export { getEarliestRecord };
