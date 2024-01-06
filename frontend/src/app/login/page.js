import LoginButton from "@/app/components/LoginButton/LoginButton";
import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import Link from "next/link";
import styles from './page.module.css'

export default function Login() {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Добро пожаловать</h1>
                <LoginTextbox type="email" label="Электронная почта" placeholder="Введите вашу электронную почту"></LoginTextbox>
                <LoginTextbox type="password" label="Пароль" placeholder="Введите ваш пароль"></LoginTextbox>
                <LoginButton text="Войти"></LoginButton>
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