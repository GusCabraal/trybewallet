const INITIAL_STATE = {
  methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  headTable: [
    'Descrição',
    'Tag',
    'Método de pagamento',
    'Valor',
    'Moeda',
    'Câmbio utilizado',
    'Valor convertido',
    'Moeda de conversão',
    'Editar/Excluir',
  ],
};
const data = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
  default:
    return state;
  }
};

export default data;
