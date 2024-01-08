import './MessagesInput.css';

const MessagesInput = () => {
    return (
        <>
            <div className="message-input-wrapper">
                <input type="text" className="message-input" placeholder="Введите сообщение..."/>
            </div>
        </>
    );
}

export default MessagesInput;