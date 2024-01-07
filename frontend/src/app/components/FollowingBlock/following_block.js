import React from 'react';
import './following_block.css';
import FollowingBlockPerson from '@/app/components/FollowingBlockPerson/following_block_person';

const FollowingBlock = () => {
  return (
    <div className="following-block">
      <div className="row mt-5">
        <div className="title">
            Некоторые подписки
        </div>
        <FollowingBlockPerson name="Биба Бобов"/>
        <FollowingBlockPerson name="Марвин Мерлин"/>
        <FollowingBlockPerson name="Роберт Ховард"/>
      </div>
    </div>
  );
};

export default FollowingBlock;
