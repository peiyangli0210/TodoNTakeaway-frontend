
import { apiClient } from './ApiClient'
// const apiClient = axios.create(
//     {
//         baseURL: 'http://localhost:8080'
//     }
// );

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/users/${username}/todos`)

export const deleteTodoApi
    = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)
    //http://localhost:8080/users/in28minutes/todos
    
export const retrieveTodoApi
    = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoApi
    = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const createTodoApi
    = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)

// export const executeBasicAuthenticationService
//     = (token) => apiClient.get(`/basicauth`,{
//         headers: {
//             Authorization: token
//         }
//     })