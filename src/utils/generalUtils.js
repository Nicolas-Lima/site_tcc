const hasUppercase = string => {
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (/[a-zA-Z]/.test(char) && char === char.toUpperCase()) {
      return true;
    }
  }
  return false;
};

const hasSpecialCharacter = string => {
  var regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(string);
};

function hasNumber(string) {
  return /\d/.test(string);
}

export { hasUppercase, hasSpecialCharacter, hasNumber };
