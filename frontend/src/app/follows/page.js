"use client";
import 'bootstrap/dist/css/bootstrap.css'
import './follows.css'
import Sidebar from "@/app/components/Sidebar/sidebar";
import FollowsSearch from "@/app/components/FollowsSearch/FollowsSearch";
import FollowingFollowerBlock from "@/app/components/FollowingFollowerBlock/FollowingFollowerBlock";
import { useEffect, useState } from 'react';

const getAuthToken = () => {
    // Вернуть токен из куки или реализовать логику, которая подходит в вашем случае
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

export default function Follows() {
    const [followingData, setFollowingData] = useState([]);
    const [followersData, setFollowersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authToken = getAuthToken();

        if (!authToken) {
            window.location.href = '/login';
        } else {
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
                                    <h1 className="title-style">Ваши подписки</h1>
                                    <FollowsSearch></FollowsSearch>
                                </div>
                                <div className="followings-list">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        followingData.map((follower, index) => (
                                            <FollowingFollowerBlock
                                                key={index}
                                                type="following"
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
                                        <p>Loading...</p>
                                    ) : (
                                        followersData.map((follower, index) => (
                                            <FollowingFollowerBlock
                                                key={index}
                                                type="follower"
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
            </div>
        </>
    )
}

