export const isValidEmail = (email: string) => {
  // Bu regex, temel email format kontrolü yapar.
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
