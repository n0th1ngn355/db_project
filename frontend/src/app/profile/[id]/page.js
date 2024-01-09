"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';
import './profile.css';
import Post from '../../components/Post/Post';

const getAuthToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

const MainLayout = ({params}) => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mypostsData, setMypostsData] = useState([]);
  const [following, setFollowing] = useState(false)
  const logout = ()=>{
    document.cookie = 'token=; path=/; expires=-1';
  }
  const follow = async (flag) => {
    const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

    try {
      const response = await fetch('http://localhost:8000/app/follows/', {
        method: flag?'POST':'DELETE',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: profileData.user_id,
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
    const authToken = getAuthToken();

    if (!authToken) {
      window.location.href = '/login';
    } else {
      // Запрос на получение данных о профиле
      fetch('http://localhost:8000/app/users/'+params.id, {
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
          setProfileData(data);
          setFollowing(data.isfollowing == 'True')
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении данных профиля:', error.message);
        });
      fetch('http://localhost:8000/app/myposts/'+params.id, {
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
          setMypostsData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении моих постов:', error.message);
        });
    }
  }, []);

  const descriptionStyle = {
    marginLeft: '5px',
    marginRight: '30px',
  };

  return (
    <div className="container mt-5">
      <div className='row'>
        <Sidebar info="profile" />
        <div className='col mx-3'>
          <div>
            <div className="row mt-4 profile-info">
              <div className="avatar col-2">
                <Image src="/avatar.svg" alt="Avatar" width={100} height={100} />
              </div>
              <div className="col">
                <div className='row'>
                  <h2 className="name_block col-6">{loading ? 'Loading...' : profileData.name} </h2>
                </div>
                <div className="d-flex">
                  <label className="num_follow">{loading ? '0' : (profileData.followers || '0')}</label>
                  <div className="description_follow" style={descriptionStyle}>Подписчики</div>
                  <label className="num_follow">{loading ? '0' : (profileData.follows || '0')}</label>
                  <div className="description_follow" style={descriptionStyle}>Подписки</div>
                </div>
                <div className='mt-3 col description'>
                  Навыки: {loading ? 'Loading...' : profileData.skills}
                </div>
                {!following && (
                      <div className="followBlock-button-wrapper">
                          <button className="followBlock-button" onClick={()=>{follow(true); setFollowing(true)}}>
                              Подписаться
                          </button>
                    </div>
                )}
                {following && (
                      <div className="followBlock-button-wrapper">
                          <button className="followBlock-button" onClick={()=>{follow(false); setFollowing(false)}}>
                            Отписаться
                          </button>
                    </div>
                )}
              </div>
            </div>
            <hr className='my-4' />
          </div>
          <div className='feed'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              mypostsData.map((post, index) => (
                <Post
                  key={index}
                  name={profileData.name}
                  id = 'self'
                  title={post.title}
                  text={post.content}
                  postDayOrTime={post.created_at}
                  initialLiked={post.initialLiked}
                  likeAmount={post.liked}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
