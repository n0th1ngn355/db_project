// components/Sidebar.js
import React from 'react';
import Link from 'next/link';
import SidebarBlock from '@/app/components/SidebarBlock/sidebar_block';

const Sidebar = () => {
    return (
        <div className='col-2'>
            <img
                src="/logo.svg"
                alt="Profile Image"
                style={{ width: '100%', maxWidth: '200px', borderRadius: '50%' }}
            />
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
