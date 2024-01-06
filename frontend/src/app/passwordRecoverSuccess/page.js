import styles from './page.module.css'
import LoginButton from "@/app/components/LoginButton/LoginButton";

export default function PasswordRecoverSuccess() {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Пароль изменен</h1>
                <p className={styles.subtitleStyle}>Вы успешно завершили сброс пароля</p>
                <LoginButton href="/login" tag="a" text="Войти"></LoginButton>
            </main>
        </>
    )
}