import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const withAuthentication = (WrappedComponent) => {
    return function AuthComponent(props){
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);  
        const [errorMessage, setErrorMessage] = useState(null); 
        
        useEffect(() => {
            fetch('http://127.0.0.1:8000/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setErrorMessage(data.message);  
                }
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));  
        }, []);

        if(loading) {
            return <div>Loading...</div>  
        }

        if(isAuthenticated){
            return <WrappedComponent {...props}/>
        }else{
            return (
                <div>
                    <Navigate to="/login"/>
                    {errorMessage && <p>{errorMessage}</p>}  
                </div>
            );
        }
    }
}

export default withAuthentication;
