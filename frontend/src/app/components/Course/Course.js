'use client'
import 'bootstrap/dist/css/bootstrap.css'
import Image from "next/image";
import './Course.css'
import { useEffect, useState } from "react";
import Link from "next/link";
import MessagesInput from '../MessagesInput/MessagesInput';

const Course = ({ name, id, created_id, update, enrolled, enroll, title, text, postDayOrTime, initialLiked, likeAmount }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [isEnroll, setIsEnroll] = useState(enrolled)
  const handleLikeClick = () => {
    setLiked(!liked);
  };
  useEffect(() => {
    setIsEnroll(enrolled)
  },[enrolled]);
  return (
    <div className='row border mx-auto post mb-5'>
      <div className="post-content-container">
        {created_id != 'self' && (
        <div className="post-header d-flex justify-content-between align-items-center">
          <Link href={`/profile/${created_id}`} className="post-user-link">
            <div className="post-avatar-wrapper">
              <Image src="/avatar.svg" alt="avatar" width={36} height={36} />
            </div>
            <div className="post-user-name-wrapper">
              <h2 className="post-user-name">{name}</h2>
            </div>
          </Link>
          {!isEnroll && (
          <div className="followBlock-button-wrapper">
            <button className="followBlock-button" onClick={() => { update(id, true); enroll(id, true); setIsEnroll(true);}}>
              Записаться
            </button>
          </div>
          )}
          {isEnroll && (
            <div className="followBlock-button-wrapper">
              <button className="followBlock-button" onClick={() => { enroll(id, false); setIsEnroll(false) }}>
                Отписаться
              </button>
            </div>
          )}
        </div>)}
        <div className="post-content">
        <h2 className="post-user-title">{title}</h2>
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
          <button  className="col mt-1 width-icons">
            <div>
              <Image src="/image.svg" alt="image" width={24} height={24} /> 
            </div>
          </button>
          <button className="col mt-1 width-icons">
            <div >
              <Image src="/addFile.svg" alt="addFile" width={24} height={24} /> 
            </div>
          </button>
          <div className="col-9"> 
            <MessagesInput></MessagesInput>
          </div>
          <button className="col-1 mt-1 width-icons">
            <div >
              <Image src="/addComment.svg" alt="addComment" width={24} height={24} /> 
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
