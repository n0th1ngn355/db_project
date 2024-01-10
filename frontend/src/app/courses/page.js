"use client";

import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import FeedSearch from '../components/FeedSearch/FeedSearch';
import CreatePostButton from '../components/CreatePostButton/CreatePostButton';
import Image from "next/image";
import Recomenendations from '@/app/components/PostRecommendation/PostRecommendation';
import Course from '../components/Course/Course';
import 'bootstrap/dist/css/bootstrap.css'
import './feed.css'
import FeedPostsTypeButton from "@/app/components/FeedPostsTypeButton/FeedPostsTypeButton";
import { useState, useEffect } from 'react';

const getAuthToken = () => {
  // Вернуть токен из куки или реализовать логику, которая подходит в вашем случае
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

const Feed = () => {
  const [showModal, setShowModal] = useState(false);
  const [postsData, setPostsData] = useState({});
  const [recPostsData, setRecPostsData] = useState({});
  const [rec, setRec] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const update = (id, flag)=>{
    if (flag){
      let temp = {...postsData}
      // console.log(recPostsData[id])
      temp[id] = recPostsData[id]
      setPostsData(temp)
    }
    // else{
    //     setFollowingData(followingData.filter((user)=>user.user_id != id))
    // }
  }
  const updateLike = (id, isLiked, likeCount)=>{
      let temp = {...postsData}
      let tempRec = {...recPostsData}
      // console.log(recPostsData[id])
      if (id in temp){
        temp[id]['liked']=likeCount
        temp[id]['isLiked']=isLiked?'True':'False'
      }
      tempRec[id]['liked']=likeCount
      tempRec[id]['isLiked']=isLiked?'True':'False'
      setPostsData(temp)
      setRecPostsData(tempRec)
}
const enroll = async (id, flag) => {
  const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

  try {
    const response = await fetch('http://localhost:8000/app/enrolled/', {
      method: flag?'POST':'DELETE',
      headers: {
        'Authorization': `Token ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course_id: id,
        // created_at: new Date().toISOString(), // Текущее время в формате ISO
      }),
    });

    if (response.ok) {
      document.querySelector('.FeedCreatePostWindow-header-close-button').click();
      // location.reload();
      console.log('Успешно');
          
    } else {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Произошла ошибка работе с подпиской:', error.message);
  }
};

  useEffect(() => {
    const authToken = getAuthToken(); // Замените эту функцию на ваш способ получения токена из куки

    // Если токен отсутствует, перенаправляем пользователя на страницу логина
    if (!authToken) {
      window.location.href = '/login';
    } else {
      // Запрос на получение курсов
      fetch('http://localhost:8000/app/enrolled/', {
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
          var t = {}
          for (let i = 0; i < data.length; i++) {
            t[data[i]['course_id']] = data[i];
          }
          setPostsData(t);
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении курсов:', error.message);
        });

        // запрос на получение всех курсов
        fetch('http://localhost:8000/app/courses/', {
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
          var t = {}
          for (let i = 0; i < data.length; i++) {
            t[data[i]['course_id']] = data[i];
          }
          setRecPostsData(t);
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении курсов:', error.message);
        });
    }

  }, []);

  const handleCreatePost = async () => {
    const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

    try {
      const response = await fetch('http://localhost:8000/app/courses/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          // created_at: new Date().toISOString(), // Текущее время в формате ISO
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
        <Sidebar info="courses" />
        <div className='col-6 mt-3'>
          <FeedSearch className='row' />
          <div className='row-1 my-3 searchPost-buttons'>
            <FeedPostsTypeButton text="Отслеживаемые" onClick={()=>setRec(false)} pressed={!rec} />
            <FeedPostsTypeButton text="Популярные" onClick={()=>setRec(true)} pressed={rec}/>
          </div>
          <div className='feed'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              Object.values(rec?recPostsData:postsData).map((post, index) => (
                <Course
                  key={index}
                  created_id = {post.created_by}
                  id = {post.course_id}
                  name={`${post.title} (id Автора: ${post.created_by})`}
                  text={post.description}
                  comments={post.comments}
                  enroll={enroll}
                  updateLike={updateLike}
                  update={update}
                  enrolled={post.course_id in postsData}
                  initialLiked={post.isLiked=='True'}
                  likeAmount={post.liked}
                />
              ))
            )}
          </div>
        </div>
        <div className='col mt-3'>
          <CreatePostButton onClick={openModal} text="Создать курс"></CreatePostButton>
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
                  <h2 className="FeedCreatePostWindow-header-title">Создать курс</h2>
                </div>
                <div className="FeedCreatePostWindow-header-close">
                  <button onClick={closeModal} className="FeedCreatePostWindow-header-close-button">
                    <Image src="/close.svg" alt="close" width={21} height={20} />
                  </button>
                </div>
              </div>
              <div className="input-text">
                <input
                  className="FeedCreatePostWindow-input"
                  type="text"
                  placeholder="Введите заголовок"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-area">
                <textarea
                  className="FeedCreatePostWindow-input"
                  id="FeedCreatePostWindow-input"
                  placeholder="Введите описание"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
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
