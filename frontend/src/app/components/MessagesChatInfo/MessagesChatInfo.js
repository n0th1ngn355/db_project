import Image from "next/image";
import Link from "next/link";
import './MessagesChatInfo.css';

const MessagesChatInfo = ({ interlocutorName }) => {
    return (
        <>
            <Link className="interlocutor-link" href={`/profile/${interlocutorName}`}>
                <div className="chat-user-info-wrapper">
                    <Image
                        className="chat-user-avatar"
                        src="/avatar.svg"
                        alt="avatar"
                        width={36}
                        height={36}
                    />
                    <h2 className="chat-user-name">{interlocutorName}</h2>
                </div>
            </Link>
        </>
    );
}

export default MessagesChatInfo;