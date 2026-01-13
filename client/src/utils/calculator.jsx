export function calcMonthlyPayment(amount, rate, term) {
  const r = rate / 100 / 12;
  return (amount * r) / (1 - Math.pow(1 + r, -term));
}

export const calculateMonthlyPayment = (principal, rate, term) => {
  const monthlyRate = rate / 100 / 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
         (Math.pow(1 + monthlyRate, term) - 1);
};

export const calculateTotalInterest = (monthlyPayment, term, principal) => {
  return (monthlyPayment * term) - principal;
};

export const calculateTotalPayment = (monthlyPayment, term) => {
  return monthlyPayment * term;
};