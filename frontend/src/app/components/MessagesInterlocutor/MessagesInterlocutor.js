import './MessagesInterlocutor.css';
import Image from "next/image";

const MessagesInterlocutor = ({ opened, name, lastMessage, lastMessageDateOrTime }) => {
    const interlocutorContainerStyle = {
        background: opened ? '#f5f5f5' : 'white',
    };

    return (
        <>
            <button className="interlocutor-open-button">
                <div className="interlocutor-container" style={interlocutorContainerStyle}>
                    <div className="interlocutor-content">
                        <div className="interlocutor-avatar-wrapper">
                            <Image src="/avatar.svg" alt="avatar" width={36} height={36}/>
                        </div>
                        <div className="interlocutor-info">
                            <div className="interlocutor-name-wrapper">
                                <h2 className="interlocutor-name">{name}</h2>
                            </div>
                            <div className="interlocutor-last-message-wrapper">
                                <p className="interlocutor-last-message">{lastMessage}</p>
                            </div>
                        </div>
                        <div className="interlocutor-last-message-time-wrapper">
                            <p className="interlocutor-last-message-time">{lastMessageDateOrTime}</p>
                        </div>
                    </div>
                </div>
            </button>
        </>
    );
}

export default MessagesInterlocutor;