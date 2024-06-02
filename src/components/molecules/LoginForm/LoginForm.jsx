// LoginForm.jsx
"use client";

// hooks
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

// Styles
import classes from "./LoginForm.module.css";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://back-test.derservicios.com.ar/login",
                { user: username, password: password }
            );
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "/home";
        } catch (error) {
            alert("Credenciales incorrectas");
        }
    };
    return (
        <form onSubmit={handleLogin} className={classes.loginForm}>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={classes.input}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.input}
            />
            <button type="submit" className={classes.button}>
                Iniciar sesión
            </button>
        </form>
    );
};

export default LoginForm;
