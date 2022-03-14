import React from "react";
import HomePage from "./Pages/HomePage/HomePage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import DetailPage from "./Pages/PostsPage/DetailPage/DetailPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import './App.css'


const PATH = {
    HOME: '/',
    POSTS: '/posts',
    PROFILE: '/profile',
    LOGIN: '/login',
};

const routes = [
    {
        path: PATH.HOME,
        element: (<HomePage />)
    },
    {
        path: PATH.POSTS,
        element: (<PostsPage />)
    },
    {
        path: PATH.PROFILE,
        element: (<ProfilePage />)
    },
    {
        path: PATH.LOGIN,
        element: (<LoginPage />)
    }
]

const navbarItem = [
    {
        to: PATH.HOME,
        title: 'Home'
    },
    {
        to: PATH.POSTS,
        title: 'Posts'
    },
    {
        to: PATH.PROFILE,
        title: 'Profile'
    }
]

const App = () => {
    const token = localStorage.getItem('token');

    function onLogoutClicked() {
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        window.location.reload();
    }

    return (
        <div>
            <BrowserRouter>
                <ul>
                    {navbarItem.map(item => (
                        <li key={item.to} ><Link className="link" to={item.to}>{item.title}</Link></li>
                    ))}
                    {!token ? (
                        <li  style={{float:"right"}}>
                            <Link className="link" to="/login">Login</Link>
                        </li>
                    ) : (
                        <li style={{float:"right"}}>
                            <button className="link" onClick={onLogoutClicked}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>

                <Routes>
                    {routes.map(route => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                    <Route path={`posts/:postId`} element={<DetailPage />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;