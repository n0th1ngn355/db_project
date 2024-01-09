"use client";
import 'bootstrap/dist/css/bootstrap.css'
import './follows.css'
import CreatePostButton from '../components/CreatePostButton/CreatePostButton';
import Sidebar from "@/app/components/Sidebar/sidebar";
import FollowsSearch from "@/app/components/FollowsSearch/FollowsSearch";
import FollowingFollowerBlock from "@/app/components/FollowingFollowerBlock/FollowingFollowerBlock";
import { useEffect, useState } from 'react';
import Image from "next/image";
import Loader from "@/app/components/Loader/Loader";


const getAuthToken = () => {
    // Вернуть токен из куки или реализовать логику, которая подходит в вашем случае
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

export default function Follows() {
    const [showModal, setShowModal] = useState(false);
    const [followingData, setFollowingData] = useState([]);
    const [followersData, setFollowersData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [usersDict, setUsersDict] = useState({});// сделано для удобства
    const [loading, setLoading] = useState(true);

    const update = (flag, id)=>{
        if (flag){

            setFollowingData(followingData.concat(usersDict[id]))
        }else{
            setFollowingData(followingData.filter((user)=>user.user_id != id))
        }
    }
    const follow = async (id) => {
        const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена
    
        try {
          const response = await fetch('http://localhost:8000/app/follows/', {
            method: 'POST',
            headers: {
              'Authorization': `Token ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: id,
              // created_at: new Date().toISOString(), // Текущее время в формате ISO
            }),
          });
    
          if (response.ok) {
            document.querySelector('.FeedCreatePostWindow-header-close-button').click();
            // location.reload();
            console.log('Подписка оформлена');
                
          } else {
            throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error('Произошла ошибка при оформлении подписки:', error.message);
        }
      };

      const unfollow = async (id) => {
        const authToken = getAuthToken(); // Предполагается, что у вас есть функция получения токена
    
        try {
          const response = await fetch('http://localhost:8000/app/follows/', {
            method: 'DELETE',
            headers: {
              'Authorization': `Token ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: id,
              // created_at: new Date().toISOString(), // Текущее время в формате ISO
            }),
          });
    
          if (response.ok) {
            document.querySelector('.FeedCreatePostWindow-header-close-button').click();
            location.reload();
            console.log('Подписка удалена');
    
          } else {
            throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error('Произошла ошибка при удалении подписки:', error.message);
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
    useEffect(() => {
        const authToken = getAuthToken();

        if (!authToken) {
            window.location.href = '/login';
        } else {
            // получаем всех пользователей
            fetch('http://localhost:8000/app/others/', {
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
                    setUsersData(data);
                    var t = {}
                    for (let i = 0; i < data.length; i++) {
                        t[data[i]['user_id']] = data[i];
                    }
                    setUsersDict(t)
                })
                .catch(error => {
                    console.error('Произошла ошибка при получении данных users:', error.message);
                })

            // Запрос для following
            fetch('http://localhost:8000/app/follows/', {
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
                    setFollowingData(data);
                })
                .catch(error => {
                    console.error('Произошла ошибка при получении данных following:', error.message);
                })
                // Запрос для followers
                .then(() => {
                    fetch('http://localhost:8000/app/followers/', {
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
                            setFollowersData(data);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Произошла ошибка при получении данных followers:', error.message);
                        });
                });
        }
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className='row'>
                    <Sidebar info="follows" />
                    <div className='col mx-3 mt-3'>
                        <div className="row">
                            <div className="col following">
                                <div className="search-wrapper">
                                    <div className='d-flex justify-content-between align-items-center m-2'>
                                        <h1 className="title-style">Ваши подписки</h1>
                                        <CreatePostButton style={{height: "35px", width: "150px"}} onClick={openModal} text="Найти"></CreatePostButton>
                                    </div>
                                    <FollowsSearch></FollowsSearch>
                                </div>
                                <div className="followings-list">
                                    {loading ? (
                                        <Loader/>
                                    ) : (
                                        followingData.map((follower, index) => (
                                            <FollowingFollowerBlock
                                                key={index}
                                                type="following"
                                                update={update}
                                                id={follower.user_id}
                                                isFollow={false}
                                                unfollow={unfollow}
                                                name={follower.name}
                                                desc={follower.description}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="col-4 followers">
                                <div className="wrapper">
                                    <div className="search-wrapper">
                                        <h1 className="title-style">Ваши подписчики</h1>
                                        <FollowsSearch></FollowsSearch>
                                    </div>
                                </div>
                                <div className="followers-list">
                                    {loading ? (
                                        <Loader/>
                                    ) : (
                                        followersData.map((follower, index) => (
                                            <FollowingFollowerBlock
                                                key={index}
                                                type="follower"
                                                follow={follow}
                                                update={update}
                                                isFollow={followingData.filter((f)=> f.user_id == follower.user_id).length != 0}
                                                id={follower.user_id}
                                                name={follower.name}
                                                desc={follower.description}
                                            />
                                        ))
                                    )}
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
                  <h2 className="FeedCreatePostWindow-header-title">Пользователи</h2>
                </div>
                <div className="FeedCreatePostWindow-header-close">
                  <button onClick={closeModal} className="FeedCreatePostWindow-header-close-button">
                    <Image src="/close.svg" alt="close" width={21} height={20} />
                  </button>
                </div>
              </div>
                <div className="followers-list" style={{padding: "15px",}}>
                {loading ? (<p>Loading...</p>) : (
                    usersData.map((follower, index) => (
                    <FollowingFollowerBlock
                        key={index}
                        type="follower"
                        follow={follow}
                        update={update}
                        isFollow={followingData.filter((f)=> f.user_id == follower.user_id).length != 0}
                        id={follower.user_id}
                        name={follower.name}
                        desc={follower.description}
                        />
                        )))}
                </div>
            </div>
          </div>
        </div>
      )}
            </div>
        </>
    )
}

