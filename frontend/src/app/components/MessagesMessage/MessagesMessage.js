import './MessagesMessage.css';

const MessagesMessage = ({ message, type, last, messageTime }) => {
    const containerStyle = {
        alignItems: type !== 'interlocutor' ? 'flex-end' : 'initial',
    };

    const wrapperStyle = {
        background: type === 'interlocutor' ? '#F3F4F6FF' : '#C7DCDDFF',
    };

    const timeStyle = {
        textAlign: type !== 'interlocutor' ? 'end' : 'initial',
    };

    return (
        <>
            <div className="row-1 message-container" style={containerStyle}>
                <div className="message-wrapper" style={wrapperStyle}>
                    <p className="message-text">{message}</p>
                </div>
                {last && (
                    <>
                        <div className="row-1 message-time-wrapper">
                            <p className="message-time" style={timeStyle}>{messageTime}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default MessagesMessage;
