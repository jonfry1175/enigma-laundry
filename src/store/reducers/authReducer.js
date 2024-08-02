const DEFAULT_STATE = {
    authData: JSON.parse(localStorage.getItem("authData")) || null,
};


    export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem("authData", JSON.stringify(action.payload.authData));
            return { ...state, authData: action.payload.authData};
        case "LOGOUT":
            localStorage.removeItem("authData");
            return { ...state, authData: null}
        case "CHECK_AUTH_STATUS":
            return {
                ...state,
                isAuthenticated: state.token ? true : false
            }
        default:
            return state
    }
}