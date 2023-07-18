function hasValidDomain(email) {
  // Regular expression pattern for matching email address with domain
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailPattern.test(email);
}

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

function validateEmailWithMessage(email) {
  let isValid = true;
  let errorMessage = "";

  const validationConditions = [
    {
      condition: !email,
      errorMessage: "Seu endereço de email está vazio",
    },
    {
      condition: !email.includes("@"),
      errorMessage: "Inclua um @ no seu endereço de email",
    },
    {
      condition:
        email.split("").filter(caracter => caracter === "@")?.length > 1,
      errorMessage: "Um endereço de email não pode ter mais de um @",
    },
    {
      condition: !email.split("@").pop().trim(),
      errorMessage: "Digite algo depois do @",
    },
    {
      condition: !email.split("@")[0]?.trim(),
      errorMessage: "Digite algo antes do @",
    },
    {
      condition: !hasValidDomain(email),
      errorMessage: "Email inválido",
    },
  ];

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false;
      errorMessage = condition.errorMessage;
    }
  });

  return {
    isValid,
    errorMessage,
  };
}

function validatePasswordWithMessage(password) {
  let isValid = true;
  let errorMessage = "";

  const validationConditions = [
    {
      condition: !hasUppercase(password),
      errorMessage: "Sua senha precisa ter pelo menos uma letra maiúscula!",
    },
    {
      condition: !hasSpecialCharacter(password),
      errorMessage: "Sua senha precisa ter pelo menos um caractere especial!",
    },
    {
      condition: !hasNumber(password),
      errorMessage: "Sua senha precisa ter pelo menos um número!",
    },
    {
      condition: !(password.length >= 6),
      errorMessage: "Sua senha precisa ter pelo menos 6 caracteres!",
    },
  ];

  validationConditions.forEach(condition => {
    if (condition.condition && isValid) {
      isValid = false;
      errorMessage = condition.errorMessage;
    }
  });

  return {
    isValid,
    errorMessage,
  };
}

export {
  hasValidDomain,
  hasUppercase,
  hasSpecialCharacter,
  hasNumber,
  validateEmailWithMessage,
  validatePasswordWithMessage,
};
