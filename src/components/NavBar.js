import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                {user ? (
                    <>
                        <li><Link to="/profiles">Profiles</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};
export default NavBar;