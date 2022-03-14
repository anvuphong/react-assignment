import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'

const validateEmail = (email) => {
    if (!email) return 'Required!';
    const isvalidEmail = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (!isvalidEmail) return 'Invalid Email'
    return '';
};

const validatePassword = password => {
    if (!password) return 'Required!';
    if (password.length < 8) return 'At least 8 character';
    return '';
}

const LoginPage = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });
    const error = {
        email: validateEmail(value.email),
        password: validatePassword(value.password)
    };
    const [isLogin, setIslogin] = useState(false);
    const navigatge = useNavigate();

    useEffect(() => {
        if (isLogin) {
            let isCancel = false;
            axios({
                method: 'GET',
                url: 'https://60dff0ba6b689e001788c858.mockapi.io/token'
            }).then(response => {
                if (!isCancel) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    navigatge('/profile');
                    window.location.reload();
                }
            });
            return () => {
                isCancel = true;
            }
        }
    }, [isLogin]);


    const handleInputChange = (evt) => {
        setValue({
            ...value,
            [evt.target.name]: evt.target.value
        })
    };
    const handleOnBlur = evt => {
        setTouched({
            ...value,
            [evt.target.name]: true
        })
    };
    const isValidForm = error.email || error.password;
    const handleSubmit = evt => {
        evt.preventDefault();
        setIslogin(true);
    };

    return (
        <div >
            <form className="login-form">
                <TextField
                    name="email"
                    type='text'
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    label="Email"
                    variant="outlined"
                    error={Boolean(error.email && touched.email)}
                    helperText={error.email}
                />
                <p />
                <TextField
                    name="password"
                    type='password'
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    label="Password"
                    variant="outlined"
                    error={Boolean(error.password && touched.password)}
                    helperText={error.password}
                />
                <Button onClick={handleSubmit} variant="contained" disabled={isValidForm} style={{ display: 'block', margin: '20px' }}>Login</Button>
            </form>
        </div>
    )
}
export default LoginPage;