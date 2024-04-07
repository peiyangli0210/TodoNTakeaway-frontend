import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
function LoginComponent() {

    // the values that could be changed
    const [username, setUsername] = useState('becca')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth()
    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }
    
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function SuccessMessageComponent() {

        if(showSuccessMessage) {
            return <div className="successMessage">Authenticated Successfully</div>
        }
        
        return null   
    }
    
    function ErrorMessageComponent() {
    
        if(showErrorMessage) {
            return <div className="errorMessage">Authentication Failed. Please check your credentials.</div>
        }
        
        return null   
    }
    
    
    async function handleSubmit() {
        if(await authContext.login(username, password)){
            // console.log('Success')
            // setShowSuccessMessage(true)
            // setShowErrorMessage(false)
            navigate(`/welcome/${username}`)
        } else {
            // console.log('Failed')
            // setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }
    

    return (
        <div className="Login">
            <h1>Please Login!</h1>
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
            <SuccessMessageComponent />
            <ErrorMessageComponent />
        </div>
    )
}

export default LoginComponent