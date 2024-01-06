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
                        src="../public/Soundwave 1.svg"
                        width={500}
                        height={500}
                        alt="Logo"
                    />
                </div>
                <div className={styles.textWrapper}>
                    <h1 className={styles.h1Style}>Social Network Project</h1>
                    <LoginButton text="Log In"></LoginButton>
                    <div className={styles.linkWrapper}>
                        <p className={styles.textStyle}>Don't have an account?</p>
                        <Link className={styles.linkStyle} href="/register/page">Sign In</Link>
                    </div>
                </div>
            </main>
        </>
    )
}