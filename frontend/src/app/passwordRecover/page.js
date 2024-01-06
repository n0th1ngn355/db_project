import LoginButton from "@/app/components/LoginButton/LoginButton";
import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import styles from './page.module.css'

export default function PasswordRecover() {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Восстановить пароль</h1>
                <p className={styles.subtitleStyle}>Пожалуйста, установите новый пароль</p>
                <LoginTextbox type="password" label="Новый пароль" placeholder="Введите новый пароль"></LoginTextbox>
                <LoginTextbox type="password" label="Повторите пароль" placeholder="Повторите пароль"></LoginTextbox>
                <LoginButton text="Восстановить"></LoginButton>
            </main>
        </>
    );
}