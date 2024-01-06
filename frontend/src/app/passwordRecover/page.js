import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import LoginButton from "@/app/components/LoginButton/LoginButton";
import FeedSearch from "@/app/components/FeedSearch/FeedSearch";
import styles from './page.module.css'

export default function PasswordRecover() {
    return (
        <>
            <main className={styles.main}>
                {/*<h1 className={styles.h1Style}>Password Recovery</h1>*/}
                {/*<p className={styles.subtitleStyle}></p>*/}
                {/*<LoginTextbox type="email" label="Email" placeholder="Введите вашу электронную почту"></LoginTextbox>*/}
                {/*<LoginButton text="Отправить"></LoginButton>*/}
                <FeedSearch></FeedSearch>
            </main>
        </>
    );
}