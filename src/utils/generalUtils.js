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

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  hasUppercase,
  hasSpecialCharacter,
  hasNumber,
  capitalizeFirstLetter,
};
