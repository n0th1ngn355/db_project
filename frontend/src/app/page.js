import Image from "next/image";
import Link from "next/link";
import LoginButton from "@/app/components/LoginButton/LoginButton";
import styles from './page.module.css'

export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.logoWrapper}>
                    <Image
                        src="/logo.svg"
                        width={500}
                        height={500}
                        alt="Logo"
                    />
                </div>
                <div className={styles.textWrapper}>
                    <h1 className={styles.h1Style}>Проект Социальная Сеть</h1>
                    <LoginButton text="Войти"></LoginButton>
                    <div className={styles.linkWrapper}>
                        <p className={styles.textStyle}>Нет аккаунта?</p>
                        <Link className={styles.linkStyle} href="/register">Зарегистрироваться</Link>
                    </div>
                </div>
            </main>
        </>
    )
}