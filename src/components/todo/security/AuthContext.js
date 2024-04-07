import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService, executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
//1: Create a Context
export const AuthContext = createContext()
// self defined
export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //Put some state in the context
    // const [number, setNumber] = useState(10)
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null) //NEW
    // setInterval( () => setNumber(number+1), 10000)
    const [token, setToken] = useState(null)

    // function login(username, password) {
    //     if(username==="becca" && password==="peipei"){
    //         setAuthenticated(true)
    //         console.log(username)
    //         setUsername(username)
    //         return true            
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }        
    // }
    // async function login(username, password) {
    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )
    //     try {

    //         const response = await executeBasicAuthenticationService(baToken)

    //         if(response.status===200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )
    //             return true            
    //         } else {
    //             logout()

    //             return false
    //         }    
    //     } catch(error) {
    //         logout()

    //         return false
    //     }
    // }
    async function login(username, password) {

        try {

            const response = await executeJwtAuthenticationService(username, password)

            if(response.status===200){
                
                const jwtToken = 'Bearer ' + response.data.token
                
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }
    function logout() {
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }


    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
} 
