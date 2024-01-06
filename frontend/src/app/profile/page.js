// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.css'

const MainLayout = () => {
    return (
      <div className="container mt-5">
        <div className='row'>
          <Sidebar />
          <div className='col'>
            /* ВОТ ТУТ ДЕЛАЕТЕ СУКА ЧЁ НАДО */
          </div>
        </div>
      </div>
    );
  };

export default MainLayout;
