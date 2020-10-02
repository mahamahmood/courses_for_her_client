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
                first_name: action.payload
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                last_name: action.payload
            };
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'SET_ISLOGGEDIN':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        default:
            return state;
    }

};

export default UserReducer;