const re =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const emailValidation = (emails) => {
  const invalidEmail =
    emails &&
    emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => re.test(email) === false);

  if (invalidEmail && invalidEmail.length) {
    return `This emails are invalid ${invalidEmail}`;
  }
  return;
};
export default emailValidation;
