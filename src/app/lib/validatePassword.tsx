export const validatePassword = (password: string) => {
  const rules = [
    { id: 1, description: 'En az 8 karakterden oluşmalı', isSatisfied: password.length >= 8 },
    { id: 2, description: 'En az 1 rakam içermeli', isSatisfied: /\d/.test(password) },
    { id: 3, description: 'En az 1 büyük ve 1 küçük hark içermeli', isSatisfied: /[a-z]/.test(password) && /[A-Z]/.test(password) },
  ];

  return rules;
};
