const DEFAULT_STATE = {
    products: [],
    customers: [],
    transactions: [],
};

export const dataReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload.products };
        case "SET_CUSTOMERS":
            return { ...state, customers: action.payload.customers };
        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.payload.transactions };
        default:
            return state
    }
}