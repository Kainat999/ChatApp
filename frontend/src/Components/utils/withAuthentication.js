import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function getTokenFromCookie() {
    const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token='));
    console.log(document.cookie);
    return tokenRow ? tokenRow.split('=')[1] : null;
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

            fetch('http://127.0.0.1:8000/auth/verify', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setErrorMessage(data.message);
                }
            })
            .catch(error => {
                console.error(error);
                setErrorMessage(error.message);
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
