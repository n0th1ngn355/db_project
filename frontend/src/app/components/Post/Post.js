'use client'
import 'bootstrap/dist/css/bootstrap.css'
import Image from "next/image";
import './Post.css'
import { useState } from "react";
import Link from "next/link";
import MessagesInput from '../MessagesInput/MessagesInput';
import PostComment from "@/app/components/PostComment/PostComment";

const Post = ({ name, comments, id, title, text, postDayOrTime, initialLiked, likeAmount }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <>
      <div className="row border mx-auto mb-5 post-container">
        <div className='post'>
          <div className="post-content-container">
            {id != 'self' && (
                <div className="post-header">
                  <Link href={`/profile/${id}`} className="post-user-link">
                    <div className="post-avatar-wrapper">
                      <Image src="/avatar.svg" alt="avatar" width={36} height={36}/>
                    </div>
                    <div className="post-user-name-wrapper">
                      <h2 className="post-user-name">{name}</h2>
                    </div>
                  </Link>
                </div>)}
            <div className="post-content">
              <h2 className="post-user-title">{title}</h2>
              <p className="post-text">{text}</p>
              <p className="post-time">{postDayOrTime}</p>
            </div>
            <div className="post-likeAndShare">
              <button className="post-like-button" onClick={handleLikeClick}>
                <Image src={liked ? "/likeLiked.svg" : "/like.svg"} alt="like" width={24} height={25}/>
                <p className="post-like-amount">{likeAmount}</p>
              </button>
              <button className="post-comments-button">
                <Image src="/comments.svg" alt="comment" width={24} height={25}/>
                <p className="post-comments-title">Комментарии</p>
              </button>
              <button className="post-share-button">
                <Image src="/share.svg" alt="share" width={24} height={25}/>
                <p className="post-share-title">Поделиться</p>
              </button>
            </div>
          </div>
        </div>
        <div className='post-comments'>
          <div className="post-comments-list">
            {comments.map((com, index) => (
            <PostComment key={index} name={com.name} text={com.content} time={com.created_at}/>))
            }
          </div>
          <div className="post-comments-addComment">
            <MessagesInput></MessagesInput>
            <button className="post-comments-addComment-button">
              <Image src="/addComment.svg" alt="addComment" width={24} height={24}/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
