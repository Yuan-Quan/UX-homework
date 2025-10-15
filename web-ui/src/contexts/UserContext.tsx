import { createContext, useContext, useEffect, useState } from "react"

export interface User {
    name: string
    avatar: string
    email: string
}

interface UserContextType {
    user: User | null
    isLoggedIn: boolean
    login: (user: User) => void
    logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error("Failed to parse stored user:", e)
            }
        }
    }, [])

    const login = (newUser: User) => {
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
