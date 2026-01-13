export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateAmount = (amount, min = 0, max = Infinity) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= min && num <= max;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateIncome = (income) => {
  return validateAmount(income, 1000, 10000000);
};

export const validatePhone = (phone) => {
  return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
};

export const validateSSN = (ssn) => {
  return /^\d{3}-?\d{2}-?\d{4}$/.test(ssn);
};