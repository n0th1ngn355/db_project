'use client'
import 'bootstrap/dist/css/bootstrap.css';
import Image from "next/image";
import './Post.css'
import { useEffect, useState } from "react";
import Link from "next/link";
import MessagesInput from '../MessagesInput/MessagesInput';
import PostComment from "@/app/components/PostComment/PostComment";

const Post = ({ name, comments, user_id, updateLike, id, title, text, postDayOrTime, initialLiked, likeAmount }) => {
  const [likeCount, setLikeCount] = useState(likeAmount)
  const [liked, setLiked] = useState(initialLiked);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comment, setComment] = useState('')

  const handleLikeClick = () => {
    like(id, !liked)
    setLiked(!liked);
    if(liked){
      setLikeCount(likeCount-1)
      updateLike(id, !liked, likeCount-1)
    }else{
      setLikeCount(parseInt(likeCount)+1)
      updateLike(id, !liked, parseInt(likeCount)+1)
    }
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };
  const getAuthToken = () => {
    // Вернуть токен из куки или реализовать логику, которая подходит в вашем случае
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  };
  const push = async () => {
    const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

    try {
      const response = await fetch('http://localhost:8000/app/comments/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          post_id: id,
          created_at: new Date().toISOString(), // Текущее время в формате ISO
        }),
      });

      if (response.ok) {
        document.querySelector('.FeedCreatePostWindow-header-close-button').click();
        location.reload();
        console.log('Запись успешно создана');

      } else {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Произошла ошибка при создании записи:', error.message);
    }
  };

  const like = async (id, flag) => {
    const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

    try {
      const response = await fetch('http://localhost:8000/app/post_likes/', {
        method: flag?'POST':'DELETE',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: id
        }),
      });

      if (response.ok) {
        document.querySelector('.FeedCreatePostWindow-header-close-button').click();
        location.reload();
        console.log('Лайк');

      } else {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Произошла ошибка при создании записи:', error.message);
    }
  };
  useEffect(() => {
    setLiked(initialLiked)
    setLikeCount(likeAmount)
  },[initialLiked, likeAmount]);
  return (
    <>
      <div className="row border mx-auto mb-5 post-container">
        <div className='post' style={!commentsVisible ? {paddingBottom: "38px"} : {}}>
          <div className="post-content-container">
            {user_id != 'self' && (
                <div className="post-header">
                  <Link href={`/profile/${user_id}`} className="post-user-link">
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
            {/* ОБЕРНУЛ В КНОПКИ В post-likeAndShare И ЗАТЕМ ДОБАВИЛ ТЕГИ И ОБЕРНУЛ В post-likeAndShare-wrapper
                СТИЛИ ТОЖЕ ЧУТЬ-ЧУТЬ ПОМЕНЯЛИСЬ */}
            <div className="post-likeAndShare-wrapper">
              <div className="post-likeAndShare">
                <button className="post-like-button" onClick={handleLikeClick}>
                  <Image src={liked ? "/likeLiked.svg" : "/like.svg"} alt="like" width={24} height={25}/>
                  <p className="post-like-amount">{likeCount}</p>
                </button>
                <button className="post-comments-button" onClick={toggleCommentsVisibility}>
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
        </div>
        {commentsVisible && (
          <div className='post-comments'>
            <div className="post-comments-list">
              {comments.map((com, index) => (
              <PostComment key={index} name={com.name} user_id={com.user_id} text={com.content} time={com.created_at}/>))
              }
            </div>
            <div className="post-comments-addComment">
              <MessagesInput text={comment} setText={setComment} placeholder={'Введите комментарий...'}/>
              <button className="post-comments-addComment-button" onClick={()=>{push(); location.reload();}}>
                <Image src="/addComment.svg" alt="addComment" width={24} height={24}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
