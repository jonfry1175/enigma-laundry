//  INI PERTANYAANYA

// const DEFAULT_STATE = {
//     token: null,
//     isAuthenticated: false,
// };

const DEFAULT_STATE = {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"), // Convert token to boolean
};


    localStorage.removeItem("token");
    export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.token, isAuthenticated: true };
        case "LOGOUT":
            return { ...state, token: null, isAuthenticated: false }
        case "CHECK_AUTH_STATUS":
            return {
                ...state,
                isAuthenticated: state.token ? true : false
            }
        default:
            return state
    }
}