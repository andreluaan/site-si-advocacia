/* ===== Dados do site (única fonte de verdade). TODO: preencher os campos entre colchetes ===== */
const SITE = {
  name: "SI Advocacia",
  phone: "083998489750",
  phone2: "081989504014",
  legalName: "Ilzinaldo dos Santos Ideão Sociedade Individual de Advocacia",
  cnpj: "52.250.493/0001-11",
  social: {
    Instagram: "https://www.instagram.com/santosideaoadv/",
    Facebook: "https://pt-br.facebook.com/santosideaoadvocacia/",
  },
  team: [
    {
      name: "Ilzinaldo dos Santos Ideão",
      oab: "OAB/[UF] [Nº]",
      areas: ["Direito Previdenciário", "Direito do Trabalho"],
      bio: "[TODO: bio de 2 linhas, em primeira pessoa do plural]",
      photo: "",
    },
  ],
  /* "Qual é a sua situação?": textos informativos, sem promessa de resultado */
  situations: [
    {
      id: "aposentadoria",
      title: "Quero me aposentar",
      hint: "ou pedir um benefício do INSS",
      text: "Analisamos seu tempo de contribuição e seus documentos para indicar o caminho adequado. Cada caso é analisado individualmente.",
      docs: [
        "Documento com foto e CPF",
        "Extrato do INSS (CNIS)",
        "Carteira de trabalho e carnês de contribuição",
        "Comprovantes de atividade rural, se houver",
      ],
      msg: "Olá! Gostaria de orientação sobre aposentadoria ou benefício do INSS.",
    },
    {
      id: "negado",
      title: "Meu benefício foi negado ou cortado",
      hint: "quero entender o que fazer",
      text: "Em muitas situações existe a possibilidade de recurso. Analisamos a decisão do INSS com você, sem garantir um desfecho, pois cada caso é único.",
      docs: [
        "Carta ou comunicado do INSS sobre a decisão",
        "Número do protocolo do pedido",
        "Laudos e exames médicos, se houver",
        "Documento com foto e CPF",
      ],
      msg: "Olá! Meu benefício foi negado ou cortado e gostaria de orientação.",
    },
    {
      id: "trabalho",
      title: "Tenho uma dúvida sobre meu trabalho",
      hint: "demissão, direitos ou acidente",
      text: "Conversamos com calma sobre sua situação e explicamos seus direitos de forma clara, sem termos difíceis.",
      docs: [
        "Carteira de trabalho",
        "Termo de rescisão e contracheques",
        "Contrato de trabalho, se tiver",
        "Mensagens, fotos ou outros comprovantes",
      ],
      msg: "Olá! Tenho uma dúvida sobre meus direitos no trabalho e gostaria de orientação.",
    },
    {
      id: "outro",
      title: "Outro assunto",
      hint: "civil, imóveis ou tributário",
      text: "Conte rapidamente do que se trata. Dizemos se podemos ajudar e quais documentos ajudam na conversa.",
      docs: [
        "Documento com foto e CPF",
        "Papéis relacionados ao assunto",
        "Se não tiver nada em mãos, tudo bem: conversamos mesmo assim",
      ],
      msg: "Olá! Gostaria de conversar sobre outro assunto jurídico.",
    },
  ],
  offices: [
    { city: "Patos", uf: "PB", addr: "R. do Prado, 981 – Liberdade, 58703-000" },
    {
      city: "João Pessoa",
      uf: "PB",
      addr: "R. Prof. Renato Carneiro da Cunha, 423 – Jaguaribe, 58015-570",
    },
    { city: "Pedras de Fogo", uf: "PB", addr: "R. Severino Borges, 141 – Planalto, 58328-000" },
    { city: "Goiana", uf: "PE", addr: "Rua Cordeiro de Faria, 60 – Centro, 55900-000" },
  ],

  lawyer: { name: "Ilzinaldo dos Santos Ideão" /* TODO confirmar grafia */, oab: "OAB/[UF] [Nº]" },
  address: "R. do Prado, 981 – Liberdade, Patos – PB, 58703-000",
  email: "santosideao@gmail.com",
  mapsUrl: "",
  mapsEmbed: "",
  formEndpoint: "",
  feesText:
    "Os honorários são definidos de forma transparente, conforme a natureza e a complexidade de cada caso, e apresentados com clareza antes da contratação.",
};
const todo = [];
JSON.stringify(SITE, (k, v) => {
  if (typeof v === "string" && /\[.+\]/.test(v)) todo.push(k);
  return v;
});
if (todo.length) console.warn("TODO pendentes em SITE:", todo.join(", "));
