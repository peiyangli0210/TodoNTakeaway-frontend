
import { useEffect, useState } from "react"
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from 'react-router-dom'

function ListTodosComponent() {

    const today = new Date()
    
    const targetDate = new Date(today.getFullYear()+1, today.getMonth(), today.getDay())
    // const todos = [
    //                 // {id: 1, description: 'eat chickfila', done: false, targetDate:targetDate},
    //                 // {id: 2, description: 'c#', done: false, targetDate:targetDate},
    //                 // {id: 3, description: 'feed fat pp', done: false, targetDate:targetDate},
    //             ]
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    const [todos,setTodos] = useState([])

    const [message,setMessage] = useState(null)

    useEffect ( () => refreshTodos(), [])

    function refreshTodos() {
        console.log(username)
        retrieveAllTodosForUsernameApi(username)
        .then(response => {
            console.log(response)
            setTodos(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }

    function deleteTodo(id) {
        // console.log('clicked ' + id)
        deleteTodoApi(username, id)
        .then(

            () => {
                setMessage(`Delete of todo with id = ${id} successfully`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
    }
    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            <div>
                <table className='table'>
                    <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Done?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>delete</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td> <button className="btn btn-success" 
                                        onClick={() => updateTodo(todo.id)}>Update</button> </td>
                                    <td> <button className="btn btn-warning" 
                                        onClick={() => deleteTodo(todo.id)}>Delete</button> </td>
                                </tr>
                            )
                        )
                    }

                    </tbody>

                </table>
                {message && <div className="alert alert-warning">{message}</div>}
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent