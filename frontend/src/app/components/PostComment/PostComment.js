import Image from 'next/image';
import './PostComment.css';

const PostComment = ({ text, time, name }) => {
    return (
        <>
            <div className="post-user-comment">
                <div className="post-user-comment-avatar-wrapper">
                    <Image src="/avatar.svg" alt="avatar" width={36} height={36}/>
                </div>
                <div className="post-user-comment-wrapper">
                    <div className="post-user-comment-content">
                        <h2 className="post-user-comment-name">{name}</h2>
                        <p className="post-user-comment-text">{text}</p>
                    </div>
                    <p className="post-user-comment-time">{time}</p>
                </div>
            </div>
        </>
    );
}

export default PostComment;