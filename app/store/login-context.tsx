import React, {createContext, useEffect, useReducer} from "react";
import {User} from "@firebase/auth";

interface LoginContextProp {
    isLoggedIn: boolean,
    user: User | null,
    setLogin: (isLoggedIn: boolean, user: User) => void
}

export const LoginContext = createContext<LoginContextProp>({
    isLoggedIn: false,
    user: null,
    setLogin: (isLoggedIn: boolean, user: User) => {
    }
});

function loginReducer(state: any, action: { type: any; payload: { isLoggedIn: boolean; user: User }; }) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user
            }
        default:
            return state;
    }

}

export default function LoginContextProvider({children}: { children: React.ReactNode }) {
    const [loginState, loginDispatch] = useReducer(loginReducer, {
        isLoggedIn: false,
        user: null
    });
    const setLogin = (isLoggedIn: boolean, user: User) => {
        loginDispatch({
            type: "LOGIN",
            payload: {
                isLoggedIn,
                user,
            }
        });
        localStorage.setItem("isLoggedIn", isLoggedIn.toString());
        localStorage.setItem("user", JSON.stringify(user));
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const user = localStorage.getItem("user");
        if (isLoggedIn && user) {
            const expireTime = parseInt(JSON.parse(user).stsTokenManager.expirationTime,10);
            if (expireTime > Date.now()) {
                loginDispatch({
                    type: "LOGIN",
                    payload: {
                        isLoggedIn: JSON.parse(isLoggedIn),
                        user: JSON.parse(user),
                    }
                });
            }
        }
    }, []);

    const contextValue: { isLoggedIn: boolean, user: User, setLogin: any } = {
        isLoggedIn: loginState.isLoggedIn,
        user: loginState.user,
        setLogin: setLogin
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}