import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import LoginButton from "@/app/components/LoginButton/LoginButton";
import Link from "next/link";
import styles from './page.module.css'

export default function Register() {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Создать аккаунт</h1>
                <LoginTextbox type="text" label="Имя" placeholder="Никита"></LoginTextbox>
                <LoginTextbox type="text" label="Фамилия" placeholder="Заботин"></LoginTextbox>
                <LoginTextbox type="email" label="Электронная почта" placeholder="example.email@gmail.com"></LoginTextbox>
                <LoginTextbox type="password" label="Пароль" placeholder="Введите хотя бы 8 символов"></LoginTextbox>
                <LoginButton text="Зарегистрироваться"></LoginButton>
                <div className={styles.linkWrapper}>
                    <p className={styles.textStyle}>Уже есть аккаунт?</p>
                    <Link className={styles.linkStyle} href={"/login"}>Войти</Link>
                </div>
            </main>
        </>
    )
}


