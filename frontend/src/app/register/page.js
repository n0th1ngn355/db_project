import LoginTextbox from "@/app/components/LoginTextbox/LoginTextbox";
import LoginButton from "@/app/components/LoginButton/LoginButton";
import styles from './page.module.css'

export default function Register() {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.h1Style}>Create an account</h1>
                <LoginTextbox type="text" label="First Name" placeholder="John"></LoginTextbox>
                <LoginTextbox type="text" label="Second Name" placeholder="Doe"></LoginTextbox>
                <LoginTextbox type="email" label="Email" placeholder="example.email@gmail.com"></LoginTextbox>
                <LoginTextbox type="password" label="Password" placeholder="Enter at least 8+ characters"></LoginTextbox>
                <LoginButton text="Sign In"></LoginButton>
            </main>
        </>
    )
}


