import React, { useState, useEffect } from 'react';
import withAuthentication from './utils/withAuthentication';

function Sidebar({ onUserSelect }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/get_all_users/')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error(error));
    }, []);

    const handleUserClick = (userId) => {
        if (typeof onUserSelect === 'function') {
            onUserSelect(userId);
        } else {
            console.warn("onUserSelect prop is missing or not a function");
        }
    }

    return (
        <div className="sidebar">
            <h3>Registered Users:</h3>
            <ul>
                {users.map(user => (
                    <li 
                        key={user.id} 
                        onClick={() => handleUserClick(user.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default withAuthentication(Sidebar)

