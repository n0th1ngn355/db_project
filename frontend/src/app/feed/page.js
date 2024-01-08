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
            <CreatePostButton text='Создать запись' className='row' />
            <div className='row mt-5'>
                <div className='row mx-auto'>
                    <p className='recommendations-title mb-3'>Рекомендации</p>
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
