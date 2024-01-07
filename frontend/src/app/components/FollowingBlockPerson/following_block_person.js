// components/FollowingBlockPerson/FollowingBlockPerson.js
import React from 'react';
import './following_block_person.css';

const FollowingBlockPerson = ({ name }) => {
    return (
        <div className="following-block-person my-2">
            <div className="avatar-wrapper">
                <img src="/avatar.svg" alt="Avatar" width="20" height="20" />
            </div>
            <div className="name-wrapper">
                <p className="name-text">{name}</p>
            </div>
        </div>
    );
};

export default FollowingBlockPerson;
