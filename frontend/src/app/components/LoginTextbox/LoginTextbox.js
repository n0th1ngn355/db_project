import './LoginTextbox.css'

const LoginTextbox = ({type, label, placeholder, icon}) => {
    const Icon = icon || null;
    return (
        <>
            <div className="textbox-wrapper">
                <label htmlFor="textbox">{label}</label>
                <input id="textbox" type={type} className="textbox" placeholder={placeholder} required/>
            </div>
        </>
    );
};

export default LoginTextbox;