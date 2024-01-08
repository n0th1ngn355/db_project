"use client";

import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import FeedSearch from '../components/FeedSearch/FeedSearch';
import CreatePostButton from '../components/CreatePostButton/CreatePostButton';
// import Image from "next/image";
import PostRecommendation from '@/app/components/PostRecommendation/PostRecommendation';
import Post from '../components/Post/Post';
import 'bootstrap/dist/css/bootstrap.min.css';
import './feed.css'
import FeedPostsTypeButton from "@/app/components/FeedPostsTypeButton/FeedPostsTypeButton";
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import Image from "next/image";
=======
import { useState, useEffect } from 'react';
>>>>>>> 3fd1551d13b7ec7211a6fa486622d1f41d3221e6

const getAuthToken = () => {
  // Вернуть токен из куки или реализовать логику, которая подходит в вашем случае
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

const Feed = () => {
    const [showModal, setShowModal] = useState(false);

<<<<<<< HEAD

    useEffect(() => {
        const authToken = getAuthToken(); // Замените эту функцию на ваш способ получения токена из куки

        // Если токен отсутствует, перенаправляем пользователя на страницу логина
        if (!authToken) {
            window.location.href = '/login';
        }
    }, []);

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
        <>
            <div className="container mt-5">
                <div className='row h-100'>
                    <Sidebar info="feed"/>
                    <div className='col-6 mt-3'>
                        <FeedSearch className='row'/>
                        <div className='row-1 my-3 searchPost-buttons'>
                            <FeedPostsTypeButton text="Отслеживаемые" pressed={true}/>
                            <FeedPostsTypeButton text="Популярные" pressed={false}/>
                        </div>
                        <div className='feed'>
                            <Post name="Джером Кук"
                                  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!"
                                  postDayOrTime="12:00" likeAmount="54"></Post>
                            <Post name="Джером Кук"
                                  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!"
                                  postDayOrTime="12:00" likeAmount="54"></Post>
                            <Post name="Джером Кук"
                                  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!"
                                  postDayOrTime="12:00" likeAmount="54"></Post>
                            <Post name="Джером Кук"
                                  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!"
                                  postDayOrTime="12:00" likeAmount="54"></Post>
                        </div>
                    </div>
                    <div className='col mt-3'>
                        <CreatePostButton onClick={openModal} text="Создать пост"></CreatePostButton>
                        <div className="row-1 my-3 recommendations-title-wrapper">
                            <p className='recommendations-title'>Рекомендации</p>
                        </div>
                        <div className='row-1'>
                            <div className='row mx-auto'>
                                <PostRecommendation name="Биба Бобов"
                                                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi eum explicabo illum quibusdam quidem voluptatum!"
                                                    likeAmount="67"></PostRecommendation>
                                <PostRecommendation name="Володя Кислов"
                                                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam assumenda cum cumque cupiditate deleniti dolorem eligendi et libero modi mollitia officia, placeat quam qui quidem quod sed vel voluptate!"
                                                    likeAmount="109"></PostRecommendation>
                                <PostRecommendation name="Акакий Бобов"
                                                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut fuga ipsa possimus quia sit veniam? Ab, cumque in minus nesciunt numquam officiis porro quasi. Ipsa nesciunt porro voluptas! Perspiciatis."
                                                    likeAmount="209"></PostRecommendation>
                                <PostRecommendation name="Володя Кислов"
                                                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam assumenda cum cumque cupiditate deleniti dolorem eligendi et libero modi mollitia officia, placeat quam qui quidem quod sed vel voluptate! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                                                    likeAmount="109"></PostRecommendation>
                            </div>
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
                                        <Image src="/close.svg" alt="close" width={21} height={20}/>
                                    </button>
                                </div>
                            </div>
                            <div className="FeedCreatePostWindow-input-wrapper">
                                <textarea className="FeedCreatePostWindow-input" id="FeedCreatePostWindow-input"></textarea>
                            </div>
                            <div className="FeedCreatePostWindow-submit-button-wrapper">
                                <button className="FeedCreatePostWindow-submit-button">Создать</button>
                            </div>
                        </div>
                    </div>
                </div>
            )};
        </>
    );
=======
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = getAuthToken(); // Замените эту функцию на ваш способ получения токена из куки

    // Если токен отсутствует, перенаправляем пользователя на страницу логина
    if (!authToken) {
      window.location.href = '/login';
    } else {
      // Запрос на получение данных о профиле
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
          setPostsData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении данных профиля:', error.message);
        });
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className='row h-100'>
        <Sidebar info="feed" />
        <div className='col-6 mt-3'>
          <FeedSearch className='row' />
          <div className='row-1 my-3 searchPost-buttons'>
            <FeedPostsTypeButton text="Отслеживаемые" pressed={true} />
            <FeedPostsTypeButton text="Популярные" pressed={false} />
          </div>
          <div className='feed'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              postsData.map((post, index) => (
                <Post
                  key={index}
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
          <CreatePostButton text='Создать запись' className='row-1' />
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
    </div>
  );
>>>>>>> 3fd1551d13b7ec7211a6fa486622d1f41d3221e6
};

export default Feed;
