// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.css'

const MainLayout = () => {
  return (
    <div className="container mt-5">
      <div className='row'>
        <Sidebar info="profile" />
        <div className='col mx-3'>
          <div>
            <h2 class="mt-5">Ваш профиль</h2>
            <div class="row mt-4">
              <div className="avatar col-2">
                <img src="/avatar.svg" alt="Avatar" style={{ width: '100%', maxWidth: '150px', borderRadius: '10%' }} />
              </div>
              <div className="profile-info col">
                <p>Имя: Ваше имя</p>
                <p>Подписки: 100</p>
                <p>Подписчики: 200</p>
                <p>Описание профиля: Краткое описание вашего профиля</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
