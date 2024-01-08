import './LoginButton.css';

const LoginButton = ({ text, tag, href, onClick }) => {
    const Tag = tag || "button";

    return (
        <Tag href={href} className="button" onClick={onClick}>
            {text}
        </Tag>
    );
};

export default LoginButton;
