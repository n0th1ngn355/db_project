// components/Sidebar.js
import React from 'react';
import SidebarBlock from '@/app/components/SidebarBlock/sidebar_block';
import SettingsBlock from '@/app/components/SettingsBlock/settings_block';

const Sidebar = ({ info }) => {
    return (
        <div className='col-2'>
            <img
                src="/logo.svg"
                alt="Profile Image"
                style={{ width: '100%', maxWidth: '200px', borderRadius: '50%' }}
            />
            <SidebarBlock info={info} href="feed" title="Feed" image="/feed.svg" />
            <SidebarBlock info={info} href="follows" title="Follows" image="/follows.svg" />
            <SidebarBlock info={info} href="messages" title="Messages" image="/messages.svg" />
            <SidebarBlock info={info} href="profile" title="Profile" image="/profile.svg" />
            <SettingsBlock/>
        </div>
    );
};

export default Sidebar;
