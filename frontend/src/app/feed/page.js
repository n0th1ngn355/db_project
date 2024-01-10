"use client";

import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import FeedSearch from '../components/FeedSearch/FeedSearch';
import CreatePostButton from '../components/CreatePostButton/CreatePostButton';
import Image from "next/image";
import Recomenendations from '@/app/components/PostRecommendation/PostRecommendation';
import Post from '../components/Post/Post';
import 'bootstrap/dist/css/bootstrap.css'
import './feed.css'
import FeedPostsTypeButton from "@/app/components/FeedPostsTypeButton/FeedPostsTypeButton";
import { useState, useEffect } from 'react';
import Loader from "@/app/components/Loader/Loader";

const getAuthToken = () => {
  // Вернуть токен из куки или реализовать логику, которая подходит в вашем случае
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

const Feed = () => {
  const [showModal, setShowModal] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [recPostsData, setRecPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rec, setRec] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const authToken = getAuthToken(); // Замените эту функцию на ваш способ получения токена из куки

    // Если токен отсутствует, перенаправляем пользователя на страницу логина
    if (!authToken) {
      window.location.href = '/login';
    } else {
      // Запрос на получение новостной ленты
      fetch('http://localhost:8000/app/feed/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
          }
        })
        .then(data => {
          setPostsData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении постов:', error.message);
        });

        // запрос на получение всех постов
        fetch('http://localhost:8000/app/posts/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
          }
        })
        .then(data => {
          function compare(a, b) {
            if (a.liked <= b.liked) 
              return 1;
            else
              return -1;
          }          
          data.sort(compare)
          setRecPostsData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении постов:', error.message);
        });
    }

  }, []);

  const handleCreatePost = async () => {
    const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

    try {
      const response = await fetch('http://localhost:8000/app/posts/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleContainerClick = (e) => {
    // Предотвратим закрытие модального окна при клике внутри контейнера
    e.stopPropagation();
  };

  return (
    <div className="container mt-5">
      <div className='row h-100'>
        <Sidebar info="feed" />
        <div className='col-6 mt-3'>
          <FeedSearch className='row' />
          <div className='row-1 my-3 searchPost-buttons'>
            <FeedPostsTypeButton text="Отслеживаемые" onClick={()=>setRec(false)} pressed={!rec} />
            <FeedPostsTypeButton text="Популярные" onClick={()=>setRec(true)} pressed={rec}/>
          </div>
          <div className='feed'>
            {loading ? (
              <Loader />
            ) : (
              (rec?recPostsData:postsData).map((post, index) => (
                <Post
                  key={index}
                  id = {post.posted}
                  name={`${post.title} (id Автора: ${post.posted})`}
                  text={post.content}
                  postDayOrTime={post.created_at}
                  initialLiked={post.initialLiked}
                  likeAmount={post.liked}
                />
              ))
            )}
          </div>
        </div>
        <div className='col mt-3'>
          <CreatePostButton onClick={openModal} text="Создать пост"></CreatePostButton>
          <div className="row-1 my-3 recommendations-title-wrapper">
            <p className='recommendations-title'>Рекомендации</p>
          </div>
          <div className='row-1'>
            <div className='row mx-auto'>
              <Recomenendations name="Биба Бобов" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi eum explicabo illum quibusdam quidem voluptatum!" likeAmount="67"></Recomenendations>
              <Recomenendations name="Володя Кислов" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam assumenda cum cumque cupiditate deleniti dolorem eligendi et libero modi mollitia officia, placeat quam qui quidem quod sed vel voluptate!" likeAmount="109"></Recomenendations>
              <Recomenendations name="Акакий Бобов" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut fuga ipsa possimus quia sit veniam? Ab, cumque in minus nesciunt numquam officiis porro quasi. Ipsa nesciunt porro voluptas! Perspiciatis." likeAmount="209"></Recomenendations>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div onClick={closeModal} className="FeedCreatePostWindow-background">
          <div onClick={handleContainerClick} className="FeedCreatePostWindow-container">
            <div className="FeedCreatePostWindow-content">
              <div className="FeedCreatePostWindow-header">
                <div className="FeedCreatePostWindow-header-title-wrapper">
                  <h2 className="FeedCreatePostWindow-header-title">Создать пост</h2>
                </div>
                <div className="FeedCreatePostWindow-header-close">
                  <button onClick={closeModal} className="FeedCreatePostWindow-header-close-button">
                    <Image src="/close.svg" alt="close" width={21} height={20} />
                  </button>
                </div>
              </div>
              <div className="input-text">
                <label htmlFor="FeedCreatePostWindow-input-title">Заголовок</label>
                <input
                  className="FeedCreatePostWindow-input"
                  type="text"
                  placeholder="Введите заголовок"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="FeedCreatePostWindow-input-title"
                />
              </div>
              <div className="input-area">
                <label htmlFor="FeedCreatePostWindow-input-text">Описание</label>
                <textarea
                  className="FeedCreatePostWindow-input"
                  id="FeedCreatePostWindow-input-text"
                  placeholder="Введите описание"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="tags-select-area">
                <label htmlFor="tags-select">Скиллы</label>
                <select id="tags-select" className="tags-select">
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                </select>
              </div>
              <div className="FeedCreatePostWindow-submit-button-wrapper">
                <button className="FeedCreatePostWindow-submit-button" onClick={handleCreatePost}>
                  Создать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Feed;
