"use client";

import { useState } from 'react';
import LoginButton from "@/app/components/LoginButton/LoginButton";
import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import Link from "next/link";
import styles from './page.module.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            console.log(email)
            console.log(password)
            console.log('логин: ' + email, 'пароль: ' + password);
            const response = await fetch('http://localhost:8000/app/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    // Успешный вход, сохраняем токен в куки
                    const expires = new Date();
                    expires.setHours(expires.getHours() + 24); // Токен будет действителен 24 часа

                    document.cookie = `token=${data.token}; expires=${expires.toUTCString()}; path=/`;

                    console.log('Успешный вход!');
                } else {
                    // Токен не вернулся, обработка ошибки
                    console.error('Сервер не вернул токен');
                }
            } else {
                // Обработка ошибок входа
                console.error('Ошибка входа:', response.statusText);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };


    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Добро пожаловать</h1>
                <LoginTextbox
                    type="email"
                    label="Электронная почта"
                    placeholder="Введите вашу электронную почту"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <LoginTextbox
                    type="password"
                    label="Пароль"
                    placeholder="Введите ваш пароль"
                    value={password}
                    onClick={(e) => setPassword(password)}
                />
                <LoginButton text="Войти" onClick={handleLogin}></LoginButton>
                <div className={styles.regLinkWrapper}>
                    <p className={styles.textStyle}>Нет аккаунта?</p>
                    <Link className={styles.linkStyle} href={'/register'}>Зарегистрироваться</Link>
                </div>
                <div className={styles.pasRecLinkWrapper}>
                    <Link className={styles.linkStyle} href={'/passwordRecoverHome'}>Забыли Пароль?</Link>
                </div>
            </main>
        </>
    );
}
