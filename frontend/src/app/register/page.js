"use client";

import { useState } from 'react';
import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import LoginButton from "@/app/components/LoginButton/LoginButton";
import Link from "next/link";
import styles from './page.module.css';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8000/app/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: firstName,
                    email: email,
                    password: password,
                    date_of_birth: "1999-01-01"
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    // Успешная регистрация, сохраняем токен в куки
                    const expires = new Date();
                    expires.setHours(expires.getHours() + 24);

                    document.cookie = `token=${data.token}; expires=${expires.toUTCString()}; path=/`;

                    // Перенаправляем пользователя на другую страницу (например, на домашнюю страницу)
                    window.location.href = '/feed';
                } else {
                    // Токен не вернулся, обработка ошибки
                    console.error('Сервер не вернул токен');
                }
            } else {
                // Обработка ошибок регистрации
                setRegisterError('Ошибка регистрации: ' + response.statusText);
            }
        } catch (error) {
            // Обработка других ошибок
            setRegisterError('Произошла ошибка: ' + error.message);
        }
    };

    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Создать аккаунт</h1>
                <LoginTextbox type="text" label="Имя" placeholder="Никита" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <LoginTextbox type="text" label="Фамилия" placeholder="Заботин" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <LoginTextbox type="email" label="Электронная почта" placeholder="example.email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <LoginTextbox type="password" label="Пароль" placeholder="Введите хотя бы 8 символов" value={password} onChange={(e) => setPassword(e.target.value)} />
                <LoginButton text="Зарегистрироваться" onClick={handleRegister} />
                {registerError && (
                    <div id="error" className="alert alert-danger">
                        {registerError}
                    </div>
                )}
                <div className={styles.linkWrapper}>
                    <p className={styles.textStyle}>Уже есть аккаунт?</p>
                    <Link className={styles.linkStyle} href={"/login"}>Войти</Link>
                </div>
            </main>
        </>
    );
}
