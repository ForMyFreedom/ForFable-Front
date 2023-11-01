import { createContext, useState, ReactNode } from "react";
import { UserWithToken } from "../../ForFable-Domain";
import { ReactDuo } from "../utils/react";

export const UserContext = createContext<ReactDuo<UserWithToken|null>>(
    [null, () => {}]
)

export const UserProvider = ({ children }: {children: ReactNode}) => {
    const localUser = localStorage.getItem('user')
    const userDuo = useState<UserWithToken | null>(
        localUser
            ? JSON.parse(localUser)
            : null
    )

    return (
        <UserContext.Provider value={userDuo}>
            {children}
        </UserContext.Provider>
    )
};
