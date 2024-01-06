import './WhiteLoginButton.css'
import Image from "next/image";

const LoginButton = ({ text, tag, href }) => {
    const Tag = tag || "button";
    return (
        <>
            <Tag href={href} className="whiteButton">
                <Image
                    className="arrow"
                    src="/arrow.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                />
                {text}
            </Tag>
        </>
    )
}

export default LoginButton;
