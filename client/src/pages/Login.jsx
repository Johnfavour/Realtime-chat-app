import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo.png'
import { useState, useEffect } from 'react'
import  {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(()=> {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();
       if ( handleValidation()) {
        const {password, username} = values;
        const {data} = await axios.post(loginRoute, {
            username,
            password,
        });
        if (data.status === false) {
            toast.error(data.msg, toastOptions)
        }
        if (data.status === true) {
            localStorage.setItem('chat-app-user', JSON.stringify(data.user));
            navigate("/");
        }
       }
    };

    const handleValidation = () => {
        const {password, username } = values;
        if (password === "") {
            toast.error("Username and Password is required.", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Username and Password is required.", toastOptions);
            return false;
        } 
        return true;
    };

    //The handle change function
    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})

    };

  return (
    <>
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1>ChatOn</h1>
            </div>
            <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            onChange={e => handleChange(e)}
            min = "3"
            />
            <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={e => handleChange(e)}
            />
            <button type="submit">Login</button>
            <span> Don't have an account ? <Link to="/register">Register</Link></span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
 height: 100vh;
 width: 100vw;
 display: flex;
 flex-direction: column;
 justify-content: center;
 gap: 1rem;
 align-items: center;
 background-color: #001F3F;
 @media screen and (min-width:600px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
 .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
        height: 5rem;
        filter: grayscale(70%);
    }
    h1 {
        color: #fff;
        text-transform: uppercase;
    }
 }
 form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000079;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: #fff;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button {
        background-color: #997af0;
        color: #fff;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transtion: 0.5s ease-in-out;
        &:hover {
            background-color: #4e0eff;
        }
    }
    span {
        color: #fff;
        text-transform: uppercase;
        a{
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold; 
        }
    }
 }
`;

export default Login