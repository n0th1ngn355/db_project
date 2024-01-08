// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import FeedSearch from '../components/FeedSearch/FeedSearch';
import CreatePostButton from '../components/CreatePostButton/CreatePostButton';
// import Image from "next/image";
import Recomenendations from '@/app/components/PostRecommendation/PostRecommendation';
import Post from '../components/Post/Post';
import 'bootstrap/dist/css/bootstrap.css'
import './feed.css'
import FeedPostsTypeButton from "@/app/components/FeedPostsTypeButton/FeedPostsTypeButton";

const Feed = () => {
  return (
    <div className="container mt-5">
      <div className='row h-100'>
        <Sidebar info="feed"/>
        <div className='col-6 mt-3'>
            <FeedSearch className='row'/> 
            <div className='row-1 my-3 searchPost-buttons'>
                <FeedPostsTypeButton text="Отслеживаемые" pressed={true} />
                <FeedPostsTypeButton text="Популярные" pressed={false} />
            </div>
            <div className='feed'>
                <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
                <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
                <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
                <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
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
                    <Recomenendations name="Акакий Бобов" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut fuga ipsa possimus quia sit veniam? Ab, cumque in minus nesciunt numquam officiis porro quasi. Ipsa nesciunt porro voluptas! Perspiciatis." likeAmount="209"></Recomenendations>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
