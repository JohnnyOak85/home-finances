const getFormattedDate = (date = new Date()) => {
  return date.toISOString().slice(0, 7).replace("-", "_");
};

export { getFormattedDate };
