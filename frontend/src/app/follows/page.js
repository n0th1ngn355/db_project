"use client";
import 'bootstrap/dist/css/bootstrap.css'
import './follows.css'
import Sidebar from "@/app/components/Sidebar/sidebar";
import FollowsSearch from "@/app/components/FollowsSearch/FollowsSearch";
import FollowingFollowerBlock from "@/app/components/FollowingFollowerBlock/FollowingFollowerBlock";
import { useEffect } from 'react';

const getAuthToken = () => {
    // Вернуть токен из куки или реализовать логику, которая подходит в вашем случае
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  };

export default function Follows() {

    useEffect(() => {
        const authToken = getAuthToken(); // Замените эту функцию на ваш способ получения токена из куки

        // Если токен отсутствует, перенаправляем пользователя на страницу логина
        if (!authToken) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className='row'>
                    <Sidebar info="follows"/>
                    <div className='col mx-3 mt-3'>
                        <div className="row">
                            <div className="col following">
                                <div className="search-wrapper">
                                    <h1 className="title-style">Ваши подписки</h1>
                                    <FollowsSearch></FollowsSearch>
                                </div>
                                <div className="followings-list">
                                    <FollowingFollowerBlock type="following" name="Билл Клинтон" desc="Я профессиональный c++ разраб наймите меня пжжжжжжжжжжжжжжжжжжжжжжжжжжжжжжжжжжж"></FollowingFollowerBlock>
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
                                    <FollowingFollowerBlock name="Билл Клинтон"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Николай Морозов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Джо Байден"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Роберт Ховард"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Марвин Мерлин"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Григорий Пивоваров"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Алексей Иванов"></FollowingFollowerBlock>
                                    <FollowingFollowerBlock name="Бичуган Гагунов"></FollowingFollowerBlock>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

