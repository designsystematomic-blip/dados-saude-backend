Foi utilizado o prompt abaixo para modelagem do banco de dados no Gemini:

Gere, por favor, o modelo conceitual de um banco de dados com o seguinte mini-mundo. O usuário tem os atributos de nome, email, senha, sexo, data de nascimento, nome social (opcinal), numero de celular, tipo sanguíneo (opcional), plano de saúde (opcional), tem alergias (se sim, lista de alergias), doenças crônicas (se sim, lista de doenças cronicas), utiliza medicamentos de uso contínuo (se sim, quais), contatos de emergência (se sim, quais. Possui nome completo, numero para contato e grau de parentesco). O usuário deseja gerencias os exames dele, para isso, existe uma lista de exames que ele pode adicionar entre 0 a N unidades. Os exames possuem os seguintes atributos: Nome do exame, Data do exame, Tipo de exame, Especialidade (Opcional), arquivo para anexo, Observações (Opcional)


await prisma.user.create({
  data: {
    email: "amanda@example.com",
    cpf: "12345678900",
    password: "123456",
    bloodType: "A_POS",
    allergies: {
      create: [
        { name: "Poeira" },
        { name: "Amendoim" },
      ],
    },
    chronicDiseases: {
      create: [
        { name: "Asma" },
      ],
    },
    medication: {
      create: [
        { name: "Antialérgico", continuousUse: false },
      ],
    },
  },
  include: {
    allergies: true,
    chronicDiseases: true,
    medication: true,
  },
});
