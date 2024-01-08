'use client'
import 'bootstrap/dist/css/bootstrap.css'
import Image from "next/image";
import './Post.css'
import { useState } from "react";
import Link from "next/link";
import MessagesInput from '../MessagesInput/MessagesInput';

const Post = ({ name, text, postDayOrTime, initialLiked, likeAmount }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className='row border mx-auto post mb-5'>
      <div className="post-content-container">
        <div className="post-header">
          <Link href={`/profile/${name}`} className="post-user-link">
            <div className="post-avatar-wrapper">
              <Image src="/avatar.svg" alt="avatar" width={36} height={36} />
            </div>
            <div className="post-user-name-wrapper">
              <h2 className="post-user-name">{name}</h2>
            </div>
          </Link>
        </div>
        <div className="post-content">
          <p className="post-text">{text}</p>
          <p className="post-time">{postDayOrTime}</p>
        </div>
        <div className="post-likeAndShare">
          <button className="post-like" onClick={handleLikeClick}>
            <Image src={liked ? "/likeLiked.svg" : "/like.svg"} alt="like" width={24} height={25} />
            <p className="post-like-amount">{likeAmount}</p>
          </button>
          <button className="post-share">
            <Image src="/share.svg" alt="share" width={24} height={25} />
            <p className="post-share-title">Поделиться</p>
          </button>
        </div>
        <div className='d-flex mt-4 center'>
          <div className="col-1 mt-1">
            <Image src="/image.svg" alt="image" width={24} height={24} /> 
          </div>
          <div className="col-1 mt-1">
            <Image src="/addFile.svg" alt="addFile" width={24} height={24} /> 
          </div>
          <div className="col-9"> 
            <MessagesInput></MessagesInput>
          </div>
          <div className="col-1 mt-1 m-2">
            <Image src="/addComment.svg" alt="addComment" width={24} height={24} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
