// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.css'
import './profile.css'

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
            <div class="row mt-4 profile-info">
              <div className="avatar col-2">
                <img src="/avatar.svg" alt="Avatar"/>
              </div>
              <div className="col">
                <h2 class="name_block">Baboon Limbov</h2>
                <div className="d-flex">
                  <label className="num_follow">200</label>
                  <div class="description_follow" style={descriptionStyle}>Подписчики</div>
                  <label className="num_follow">100</label>
                  <div className="description_follow" style={descriptionStyle}>Подписки</div>
                </div>
                <div className='mt-2 col description'>
                Consectetur duis velit minim eiusmod consectetur officia nisi consectetur aliqua elit mollit fugiat reprehenderit mollit ipsum qui. Sint fugiat tempor ipsum reprehenderit cupidatat ex veniam eu eu id aliqua tempor proident. Mollit fugiat voluptate quis laborum sunt non sint qui elit sint.Cillum ipsum consectetur ut et dolor voluptate enim aliqua labore. Ma
                </div>
              </div>
            </div>
            <hr className='my-5'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
