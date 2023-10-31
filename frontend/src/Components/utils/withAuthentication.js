import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios'; 

function getTokenFromCookie() {
    const token = Cookies.get("token");
    return token || null;
}

const withAuthentication = (WrappedComponent) => {
    return function AuthComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);
        const [errorMessage, setErrorMessage] = useState(null);

        useEffect(() => {
            const token = getTokenFromCookie();

            if (!token) {
                setErrorMessage("Token is missing");
                setLoading(false);
                return;
            }

            axios.post('http://127.0.0.1:8000/auth/verify/', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            .then(response => {
                if (response.status !== 200) {
                    console.error(`Network response not ok. Status: ${response.status}, Text: ${response.statusText}`);
                    throw new Error("Network response was not ok");
                }
                return response.data;
            })
            .then(data => {
                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                    setLoading(false);
                } else {
                    setIsAuthenticated(false);
                    setErrorMessage(data.message);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error(error);
                setErrorMessage(error.message);
                setLoading(false);
            })
            .finally(() => setLoading(false));
            
        }, []);

        if (loading) {
            return <div>Loading...</div>
        }

        if (isAuthenticated) {
            return <WrappedComponent {...props} />
        } else {
            return (
                <div>
                    {/* <Navigate to="/login" /> */}
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            );
        }
    }
}

export default withAuthentication;
