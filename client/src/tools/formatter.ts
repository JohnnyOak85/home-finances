const currency = "EUR";
const locale = "pt-PT";
const timeZone = "Europe/Lisbon";
const nonDigitRegex = /[^\d.]/g;
const multipleDotsRegex = /(\..*)\./g;

/**
 * Formats a numeric or string value as currency.
 * @param value The value to format as currency.
 * @returns The formatted currency string.
 */
const formatCurrency = (value: number): string => {
  const { format } = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
  });

  return format(value);
};

const formatDate = (date: string) => {
  const { format } = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone,
  });

  const formatted = format(new Date(date.replace("_", "-")));

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const formatCurrencyFromString = (value: string): number => {
  const cleanedValue = value
    .replace(nonDigitRegex, "")
    .replace(multipleDotsRegex, "$1");
  const [integerPart, decimalPart = ""] = cleanedValue.split(".");
  const formattedValue = integerPart + "." + (decimalPart + "00").slice(0, 2);

  return parseFloat(formattedValue);
};

export { formatCurrency, formatDate, formatCurrencyFromString };
