export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim().toLowerCase());
};

export const isValidPassword = (password) => {
  return password.length >= 6;
};

export const isValidUsername = (username) => {
  return username.trim().length >= 3;
};