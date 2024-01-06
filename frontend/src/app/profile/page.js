// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/components/Sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.css'

const MainLayout = () => {
    return (
      <div className="container mt-5">
        <div className='row'>
          <Sidebar info="Profile"/>
          <div className='col'>
            <div>
              <h2>User's Profile</h2>
              <p>Welcome to the user's profile page. Explore the content below.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default MainLayout;
