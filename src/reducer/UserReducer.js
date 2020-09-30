const UserReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ID':
            return {
                ...state,
                id: action.payload
            };
        case 'SET_FIRST_NAME':
            return {
                ...state,
                firstName: action.payload
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                lastName: action.payload
            };
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'SET_LOGGEDIN':
            return {
                ...state,
                loggedIn: action.payload
            };
        default:
            return state;
    }

};

export default UserReducer;