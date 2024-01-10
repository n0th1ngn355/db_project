"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';
import './profile.css';
import SkillsBlock from '../components/SkillsBlock/SkillsBlock';
import Post from '../components/Post/Post';
import Loader from '@/app/components/Loader/Loader';
import button from "bootstrap/js/src/button";

const getAuthToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

const MainLayout = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mypostsData, setMypostsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState({});
  const [mySkills, setMySkills] = useState([]);

  const logout = ()=>{
    document.cookie = 'token=; path=/; expires=-1';
  }
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

  const update = (flag, id)=>{
    if (flag){
        setMySkills(mySkills.concat(skills[id]))
    }else{
        setMySkills(mySkills.filter((s)=>s.skill_id != id))
    }
}
const take = async (id) => {
    const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

    try {
      const response = await fetch('http://localhost:8000/app/myskills/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill_id: id,
          // created_at: new Date().toISOString(), // Текущее время в формате ISO
        }),
      });

      if (response.ok) {
        document.querySelector('.FeedCreatePostWindow-header-close-button').click();
        // location.reload();
        console.log('Скилл теперь ваш');
        setShowModal(true)
            
      } else {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Произошла ошибка при оформлении подписки:', error.message);
    }
  };

  const untake = async (id) => {
    const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена

    try {
      const response = await fetch('http://localhost:8000/app/myskills/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill_id: id,
          // created_at: new Date().toISOString(), // Текущее время в формате ISO
        }),
      });

      if (response.ok) {
        document.querySelector('.FeedCreatePostWindow-header-close-button').click();
        // location.reload();
        console.log('Скилл теперь не ваш');
        setShowModal(true)

      } else {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Произошла ошибка при удалении подписки:', error.message);
    }
  };


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

      // получаем скиллы
      fetch('http://localhost:8000/app/skills/', {
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
            t[data[i]['skill_id']] = data[i];
          }
          setSkills(t)
        })
        .catch(error => {
          console.error('Произошла ошибка при получении навыков:', error.message);
        });

        // получаем скиллы пользователя
      fetch('http://localhost:8000/app/myskills/', {
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
          setMySkills(data)
        })
        .catch(error => {
          console.error('Произошла ошибка при получении навыков:', error.message);
        });

        // получаем посты пользователя
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
                <div className='profile-header'>
                  <h2 className="name_block">{loading ? 'Loading...' : profileData.name}</h2>
                  {!loading ? (
                    <button className="exit-profile-button" onClick={logout}>
                      <Image src="/logout.svg" alt="logout" width={25} height={25}/>
                    </button>
                  ) : null}
                </div>
                <div className="d-flex">
                  <label className="num_follow">{loading ? '0' : (profileData.followers || '0')}</label>
                  <div className="description_follow" style={descriptionStyle}>Подписчики</div>
                  <label className="num_follow">{loading ? '0' : (profileData.follows || '0')}</label>
                  <div className="description_follow" style={descriptionStyle}>Подписки</div>
                </div>
                <div className='mt-3 col description'>
                  Навыки: {loading ? 'Loading...' : mySkills.map((x)=>x.name).join(', ')}
                  {!loading ? (
                    <button className="change-skills-button" onClick={openModal}>
                      <Image src="/edit.svg" alt="logout" width={24} height={25}/>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            <hr className='my-4' />
          </div>
          <div className='feed'>
            {loading ? (
              <Loader/>
            ) : (
              mypostsData.map((post, index) => (
                <Post
                  key={index}
                  user_id = 'self'
                  id = {post.post_id}
                  name={profileData.name}
                  title={post.title}
                  comments={post.comments}
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
      {showModal && (
        <div onClick={closeModal} className="FeedCreatePostWindow-background">
          <div onClick={handleContainerClick} className="FeedCreatePostWindow-container">
            <div className="FeedCreatePostWindow-content">
              <div className="FeedCreatePostWindow-header">
                <div className="FeedCreatePostWindow-header-title-wrapper">
                  <h2 className="FeedCreatePostWindow-header-title">Навыки</h2>
                </div>
                <div className="FeedCreatePostWindow-header-close">
                  <button onClick={closeModal} className="FeedCreatePostWindow-header-close-button">
                    <Image src="/close.svg" alt="close" width={21} height={20} />
                  </button>
                </div>
              </div>
                <div className="followers-list" style={{padding: "15px",}}>
                {loading ? (
                  <Loader/>
                ) : (
                  Object.values(skills).map((sk, index) => (
                  <SkillsBlock
                    key={index}
                    take={take}
                    untake={untake}
                    update={update}
                    has={mySkills.filter((s)=> s.skill_id == sk.skill_id).length != 0}
                    id={sk.skill_id}
                    name={sk.name}
                    />
                    )))}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
