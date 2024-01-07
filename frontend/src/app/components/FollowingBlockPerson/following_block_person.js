// components/FollowingBlockPerson/FollowingBlockPerson.js
import React from 'react';
import './following_block_person.css';
import Image from "next/image";
import Link from "next/link";

const FollowingBlockPerson = ({ name }) => {
    return (
        <Link className="following-block-person-link" href={`/profile/${name}`} passHref={true}>
            <div className="following-block-person my-2">
                <div className="avatar-wrapper">
                    <Image src="/avatar.svg" alt="Avatar" width="20" height="20"/>
                </div>
                <div className="name-wrapper">
                    <p className="name-text">{name}</p>
                </div>
            </div>
        </Link>
    );
};

export default FollowingBlockPerson;
