export const validateNID = (nid: string) => {
  const nidRegex = /^(?:\d{10}|\d{13}|\d{17})$/;
  return nidRegex.test(nid);
};
export const validatePhone = (phone: string) => {
  const phoneRegex = /^01[3-9]\d{8}$/;
  return phoneRegex.test(phone);
};

export const ValidationEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
