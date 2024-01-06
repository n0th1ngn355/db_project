// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/profile/sidebar.js';
import 'bootstrap/dist/css/bootstrap.css'

const MainLayout = ({ children }) => {
    return (
      <div className="container mt-5">
        <div className='row'>
          <Sidebar />
          <div className='col'>
            <div>
              <h2>User's Profile</h2>
              <p>Welcome to the user's profile page. Explore the content below.</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };

export default MainLayout;
