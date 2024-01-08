// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.css'
import './profile.css'
import Post from '../components/Post/Post';

const MainLayout = () => {
  const descriptionStyle = {
    marginLeft: '5px',
    marginRight: '30px'
  };

  return (
    <div className="container mt-5">
      <div className='row'>
        <Sidebar info="profile" />
        <div className='col mx-3'>
          <div>
            <div className="row mt-4 profile-info">
              <div className="avatar col-2">
                <Image src="/avatar.svg" alt="Avatar" width={100} height={100}/>
              </div>
              <div className="col">
                <h2 className="name_block">Бабун Лимбов</h2>
                <div className="d-flex">
                  <label className="num_follow">200</label>
                  <div className="description_follow" style={descriptionStyle}>Подписчики</div>
                  <label className="num_follow">100</label>
                  <div className="description_follow" style={descriptionStyle}>Подписки</div>
                </div>
                <div className='mt-2 col description'>
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium cumque debitis deleniti eveniet fugiat fugit ipsa ipsum libero minima nemo, neque officiis pariatur possimus quas recusandae repellendus saepe soluta.
                </div>
              </div>
            </div>
            <hr className='my-4'/>
          </div>
          <div className='feed'>
            <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
            <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
            <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
            <Post name="Джером Кук" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam eum fuga in, nemo numquam quisquam ullam veniam vitae voluptate. Deleniti ducimus fugit hic mollitia officiis optio possimus temporibus, ullam!" postDayOrTime="12:00" likeAmount="54"></Post>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
