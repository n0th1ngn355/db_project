import './LoginButton.css'

const LoginButton = ({ text, tag, href }) => {
    const Tag = tag || "button";
    return (
        <Tag href={href} className="button">{text}</Tag>
    );
}

export default LoginButton;
