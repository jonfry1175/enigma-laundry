export const setProducts = (products) => ({
    type: "SET_PRODUCTS",
    payload: { products },
});

export const setCustomers = (customers) => ({
    type: "SET_CUSTOMERS",
    payload: { customers },
});

export const setTransactions = (transactions) => ({
    type: "SET_TRANSACTIONS",
    payload: { transactions },
})