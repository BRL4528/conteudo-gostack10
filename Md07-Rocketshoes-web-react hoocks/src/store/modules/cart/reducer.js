import produce from 'immer';

// Toda vez que for feito um dispath, vai disparar todos os meus Reducers,
// isso não é o correto para minha aplicação, por isso Utilizo o switch - case
// para verificar qual reducer esta vindo na minha action, e executando o reducer correto,
// de acordo com o meu type.
export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      // Todas as alterações realizadas dentro de um Draft, são refletidas em meus State
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        // procura o produto com o mesmo id, se encontrar remove o produto
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        // atulizar valores
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
