"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';
import './profile.css';
import Post from '../components/Post/Post';

const getAuthToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

const MainLayout = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mypostsData, setMypostsData] = useState([]);

  useEffect(() => {
    const authToken = getAuthToken();

    if (!authToken) {
      window.location.href = '/login';
    } else {
      // Запрос на получение данных о профиле
      fetch('http://localhost:8000/app/self/', {
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
          setLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка при получении данных профиля:', error.message);
        });
      fetch('http://localhost:8000/app/myposts/', {
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
                <h2 className="name_block">{loading ? 'Loading...' : profileData.name}</h2>
                <div className="d-flex">
                  <label className="num_follow">{loading ? '0' : (profileData.followers || '0')}</label>
                  <div className="description_follow" style={descriptionStyle}>Подписчики</div>
                  <label className="num_follow">{loading ? '0' : (profileData.following || '0')}</label>
                  <div className="description_follow" style={descriptionStyle}>Подписки</div>
                </div>
                <div className='mt-3 col description'>
                  {loading ? 'Loading...' : profileData.date_of_birth}
                </div>
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
