export const setTransactions = (transactions) => ({
    type: "SET_TRANSACTIONS",
    payload: { transactions },
})

export const addTransaction = (transaction) => ({
    type: "ADD_TRANSACTION",
    payload: { transaction },
})