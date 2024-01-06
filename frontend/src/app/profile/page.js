// layouts/MainLayout.js
import React from 'react';
import Sidebar from '@/app/profile/components/sidebar.js';

const MainLayout = ({ children }) => {
    return (
      <div style={{ margin: '0 auto', maxWidth: '1200px', width: '100%' }}>
        {/* Применяем горизонтальные отступы и максимальную ширину */}
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src="https://example.com/your-image.jpg"
                alt="Profile Image"
                style={{ width: '100%', maxWidth: '200px', borderRadius: '50%' }}
              />
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
