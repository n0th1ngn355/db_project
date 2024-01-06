import WhiteLoginButton from "@/app/components/WhiteLoginButton/WhiteLoginButton";
import styles from './page.module.css'

export default function PasswordRecoverMessage() {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Проверьте свою электронную почту</h1>
                <p className={styles.subtitleStyle}>Спасибо! Было отправлено письмо, в котором вам предлагается перейти по ссылке, чтобы подтвердить что вы являетесь владельцем этой учетной записи.</p>
                <WhiteLoginButton text="Отправить письмо повторно"></WhiteLoginButton>
            </main>
        </>
    );
}