const dateRegex = /^20[2-9][0-9]_(0[1-9]|1[0-2])$/;

const isValidDate = (date?: string) => {
  return !!date && dateRegex.test(date);
};

export { isValidDate };
