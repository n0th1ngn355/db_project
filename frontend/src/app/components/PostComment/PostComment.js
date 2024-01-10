import Image from 'next/image';
import './PostComment.css';
import Link from "next/link";

const PostComment = ({ text, time, name, user_id}) => {
    return (
        <>
            <div className="post-user-comment">
                <div className="post-user-comment-avatar-wrapper">
                    <Image src="/avatar.svg" alt="avatar" width={36} height={36}/>
                </div>
                <div className="post-user-comment-wrapper">
                    <div className="post-user-comment-content">
                        <Link href={`/profile/${user_id}`} className="post-user-link">
                            <h2 className="post-user-comment-name">{name}</h2>
                        </Link>
                        <p className="post-user-comment-text">{text}</p>
                    </div>
                    <p className="post-user-comment-time">{time}</p>
                </div>
            </div>
        </>
    );
}

export default PostComment;