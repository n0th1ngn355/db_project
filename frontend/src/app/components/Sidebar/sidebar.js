// components/Sidebar.js
import React from 'react';
import SidebarBlock from '@/app/components/SidebarBlock/sidebar_block';
import SettingsBlock from '@/app/components/SettingsBlock/settings_block';
import FollowingBlock from '@/app/components/FollowingBlock/following_block';

const Sidebar = ({ info }) => {
    return (
        <div className='col-2'>
            <img
                src="/logo.svg"
                alt="Profile Image"
                style={{ width: '100%', maxWidth: '200px', borderRadius: '50%' }}
            />
            <SidebarBlock info={info} href="/feed" title="Новости" image="/feed.svg" />
            <SidebarBlock info={info} href="/follows" title="Подписки" image="/follows.svg" />
            <SidebarBlock info={info} href="/courses" title="Курсы" image="/course.svg" />
            <SidebarBlock info={info} href="/messages" title="Сообщения" image="/messages.svg" />
            <SidebarBlock info={info} href="/profile" title="Мой профиль" image="/profile.svg" />
            <FollowingBlock/>
            <SettingsBlock/>
        </div>
    );
};

export default Sidebar;
