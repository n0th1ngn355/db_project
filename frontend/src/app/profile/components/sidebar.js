// components/Sidebar.js
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
    return (
      <div>
        <h2>Sidebar</h2>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link href="/friends">Friends</Link>
          </li>
          <li>
            <Link href="/messages">Messages</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    );
  };

export default Sidebar;
