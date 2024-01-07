// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import FeedSearch from '../components/FeedSearch/FeedSearch';
import CreatePostButton from '../components/CreatePostButton/CreatePostButton';
import Image from "next/image";
import Recomenendations from '../components/Recomendation/Recomentaion';
// import Post from 
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
                    <button className='btnMenu'>Отслеживаемые</button>
                </div>
                <div className='col-2'>
                    <button className='btnMenu'>Тренды</button>
                </div>
            </div>
            <div className='row border h-50 mx-auto post'>
              <div class="mb-5">
                <div class="p-2 mt-3 row mx-auto">

                  <div className='col-1'>
                    <Image
                      className='image'
                      src="/user.svg"
                      alt="search"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className='col justify-content-center align-self-center'>
                    <p className='m-0'>John Doe</p>
                  </div>
                  <div className='mt-2'>
                    <p>
                    Laborum enim esse magna enim incididunt aliqua ad officia fugiat ad aliquip aute laboris non non sunt. 
                    Mollit Lorem est aliqua ipsum occaecat dolor eu nisi amet nostrud eu deserunt pariatur ut dolore. Veniam 
                    est sit cillum ullamco ea voluptate proident. In fugiat officia pariatur enim culpa deserunt est incididunt nisi 
                    ea enim.Est exercitation do enim tempor minim in ut magna ipsum reprehenderit fugiat nulla esse consectetur sint 
                    ipsum. Culpa ea cillum pariatur sint sunt consequat amet ea in nostrud repr
                    </p>
                  </div>

                </div>
              </div>
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
