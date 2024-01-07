// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import FeedSearch from '../components/FeedSearch/FeedSearch';
import CreatePostButton from '../components/CreatePostButton/CreatePostButton';
// import Image from "next/image";
import Recomenendations from '../components/Recomendation/Recomentaion';
import Post from '../components/Post/Post';
import 'bootstrap/dist/css/bootstrap.css'
import './feed.css'

const Feed = () => {
  return (
    <div className="container mt-5">
      <div className='row h-100'>
        <Sidebar info="feed"/>
        <div className='col-6 mt-3'>
            <FeedSearch className='row'/> 
            <div className='row mt-4 mb-3'>
                <div className='col-3'>
                    <button className='btn'>Отслеживаемые</button>
                </div>
                <div className='col-2'>
                    <button className='btn'>Тренды</button>
                </div>
            </div>
            <div id='scroll-feed' className='scroll'>
              <Post></Post>
              <Post></Post>
              <Post></Post>
            </div>
        </div>
        <div className='col mt-3'>
            <CreatePostButton text='Создать запись' className='row' />
            <div className='row mt-5'>
                <div className='row mx-auto'>
                    <p className='recom-title mb-3'>
                        Рекомендации
                    </p>

                    <Recomenendations></Recomenendations>
                    <Recomenendations></Recomenendations>
                    <Recomenendations></Recomenendations>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Feed;
