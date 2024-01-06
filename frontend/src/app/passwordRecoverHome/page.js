import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import LoginButton from "@/app/components/LoginButton/LoginButton";
import WhiteLoginButton from "@/app/components/WhiteLoginButton/WhiteLoginButton";
import styles from './page.module.css'

export default function PasswordRecoverHome() {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Забыли пароль?</h1>
                <p className={styles.subtitleStyle}>Введите свою электронную почту, чтобы мы могли отправить вам ссылку для сброса пароля</p>
                <LoginTextbox type="email" label="Email" placeholder="Введите вашу электронную почту"></LoginTextbox>
                <LoginButton text="Отправить"></LoginButton>
                <WhiteLoginButton href="/login" tag="a" text="Обратно ко Входу"></WhiteLoginButton>
            </main>
        </>
    );
}