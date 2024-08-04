const DEFAULT_STATE = {
    transactions: [],
};

export const transactionReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.payload.transactions };

        case "ADD_TRANSACTION":
            return { ...state, transactions: [...state.transactions, action.payload.transaction] };
        default:
            return state
    }
}