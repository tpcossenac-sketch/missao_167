
// Importa a função validateLead do arquivo validation.js
const { validateLead } = require("../src/validation");

// Agrupa todos os testes relacionados à validação de cadastro
describe("Testes da função validateLead()", () => {

    // 1. Verifica se um cadastro completo, com todos os campos preenchidos corretamente, é aceito
    test("Aceita cadastro completo válido", () => {
        const result = validateLead({
            name: "Ana Souza",
            email: "ana@email.com",
            phone: "27999999999",
            interest: "Online"
        });

        // Verifica se o cadastro foi considerado válido
        expect(result.valid).toBe(true);

        // Verifica se não existem mensagens de erro
        expect(result.errors.length).toBe(0);
    });

    // 2. Verifica se o cadastro é aceito mesmo sem preencher os campos opcionais
    test("Aceita cadastro mínimo válido", () => {
        const result = validateLead({
            name: "Ana",
            email: "ana@email.com"
        });

        // Verifica se o cadastro foi considerado válido
        expect(result.valid).toBe(true);
    });

    // 3. Verifica se o sistema rejeita nomes com menos de 3 caracteres
    test("Rejeita nome muito curto", () => {
        const result = validateLead({
            name: "Jo",
            email: "ana@email.com"
        });

        // Verifica se a mensagem de erro esperada aparece
        expect(result.errors).toContain("Informe seu nome (mínimo de 3 caracteres).");
    });

    // 4. Verifica se o sistema rejeita nomes preenchidos apenas com espaços
    test("Rejeita nome com espaços vazios", () => {
        const result = validateLead({
            name: "   ",
            email: "ana@email.com"
        });

        // Verifica se o cadastro foi considerado inválido
        expect(result.valid).toBe(false);
    });

    // 5. Verifica se o sistema rejeita nomes que não são do tipo string
    test("Rejeita nome com tipo incorreto", () => {
        const result = validateLead({
            name: 123,
            email: "ana@email.com"
        });

        // Verifica se o cadastro foi considerado inválido
        expect(result.valid).toBe(false);
    });

    // 6. Verifica se o sistema rejeita e-mails sem o símbolo @
    test("Rejeita e-mail sem @", () => {
        const result = validateLead({
            name: "Ana",
            email: "anaemail.com"
        });

        // Verifica se a mensagem de e-mail inválido foi adicionada
        expect(result.errors).toContain("Informe um e-mail válido.");
    });

    // 7. Verifica se o sistema rejeita e-mails sem domínio completo
    test("Rejeita e-mail incompleto", () => {
        const result = validateLead({
            name: "Ana",
            email: "email@email"
        });

        // Verifica se o cadastro foi considerado inválido
        expect(result.valid).toBe(false);
    });

    // 8. Verifica se o sistema rejeita e-mails que não são do tipo string
    test("Rejeita e-mail com tipo incorreto", () => {
        const result = validateLead({
            name: "Ana",
            email: 12345
        });

        // Verifica se o cadastro foi considerado inválido
        expect(result.valid).toBe(false);
    });

    // 9. Verifica se o sistema rejeita telefones enviados como números
    test("Rejeita telefone com tipo numérico", () => {
        const result = validateLead({
            name: "Ana",
            email: "ana@email.com",
            phone: 27999999999
        });

        // Verifica se a mensagem de erro do telefone aparece
        expect(result.errors).toContain("O telefone deve ser um texto.");
    });

    // 10. Verifica se o sistema rejeita modalidades que não estão na lista permitida
    test("Rejeita modalidade inválida", () => {
        const result = validateLead({
            name: "Ana",
            email: "ana@email.com",
            interest: "Híbrido"
        });

        // Verifica se a mensagem de modalidade inválida aparece
        expect(result.errors).toContain("Selecione uma modalidade válida.");
    });

    // 11. Verifica se o sistema diferencia letras maiúsculas e minúsculas
    test("Rejeita modalidade com diferença de caixa", () => {
        const result = validateLead({
            name: "Ana",
            email: "ana@email.com",
            interest: "online"
        });

        // Verifica se a modalidade escrita com letra minúscula foi rejeitada
        expect(result.valid).toBe(false);
    });

});
