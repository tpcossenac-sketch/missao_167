// Esta função extrai os campos do formulário
function validateLead({ name, email, phone, interest }) {
  // Crie um vetor que vai acumular os problemas encontrados ao longo da validação
  const errors = [];

  // Validação do nome: 
  if (typeof name !== "string" || name.trim().length < 3) {
    errors.push("Informe seu nome (mínimo de 3 caracteres).");
  }

  // Validação de e-mail: Verifica se o e-mail não é uma string ou se não passa no teste de validação de e-mail
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    errors.push("Informe um e-mail válido.");
  }

  // Validação de telefone: Verifica se o telefone foi preenchido no formulário e se o tipo da variável "phone" é diferente de string, caso seja diferente de string, adiciona uma mensagem de erro no vetor "errors"
  if (phone && typeof phone !== "string") {
    errors.push("O telefone deve ser um texto.");
  }

  // Crie um vetor com as opções as modalidades de curso
  const allowedInterests = ["Online", "Presencial", "Ainda não sei"];
  
  // Validação e modalidade de curso: Verifica se a modalidade se a modalidade de interesse foi preenchida e 
  if (interest && !allowedInterests.includes(interest)) {
    errors.push("Selecione uma modalidade válida.");
  }

  return { valid: errors.length === 0, errors };
}

function normalizeCourseFilter(modality) {
  if (!modality || modality === "Todos") return null;
  const allowed = ["Online", "Presencial"];
  return allowed.includes(modality) ? modality : null;
}

module.exports = { validateLead, normalizeCourseFilter };