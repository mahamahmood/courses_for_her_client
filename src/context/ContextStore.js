import React, { useReducer } from "react";
import UserReducer from "../reducer/UserReducer";

// ==== userContext ====
// default state that will be used to compare the state across all components with context provider

const defaultUserState = {
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    courses: [],
    isLoggedIn: false
};

// ==== ContextStore ====
// ContextStore componente will be wraped around other componentes to provide the user state. can be used across the app.
// You can update the state using dispathcUserState()
// UserReducer.js requires an object with type and paylaod. type will be the type of action that will be performed in the reducer switch cases and payload is the new content.

export default function ContextStore({ children }) {
    const [userState, dispatchUserState] = useReducer(
        UserReducer,
        defaultUserState
    );
    return (
        <UserContext.Provider value={[userState, dispatchUserState]}>
            {children}
        </UserContext.Provider>
    );
}

// UserContext will be used by useContext() to check state changes

export const UserContext = React.createContext(defaultUserState);