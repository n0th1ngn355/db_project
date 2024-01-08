"use client";

import { useState } from 'react';
import LoginButton from "@/app/components/LoginButton/LoginButton";
import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import Link from "next/link";
import styles from './page.module.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const handleLogin = async () => {
        try {
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
                    expires.setHours(expires.getHours() + 24);

                    document.cookie = `token=${data.token}; expires=${expires.toUTCString()}; path=/`;

                    // Отображаем сообщение об успешном входе
                    setLoginError('Успешный вход!');
                    window.location.href = '/feed';
                } else {
                    // Токен не вернулся, обработка ошибки
                    setLoginError('Сервер не вернул токен');
                }
            } else {
                // Обработка ошибок входа
                setLoginError('Ошибка входа: ' + response.statusText);
            }
        } catch (error) {
            // Обработка других ошибок
            setLoginError('Произошла ошибка: ' + error.message);
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoginButton text="Войти" onClick={handleLogin}></LoginButton>
                {loginError !== null && (
                    <div id="error" className={`alert ${loginError.includes('Успешный вход') ? 'alert-success' : 'alert-danger'}`}>
                        {loginError}
                    </div>
                )}
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