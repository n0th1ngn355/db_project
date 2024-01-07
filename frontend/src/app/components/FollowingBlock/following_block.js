import React from 'react';
import './following_block.css';
import FollowingBlockPerson from '@/app/components/FollowingBlockPerson/following_block_person';

const FollowingBlock = () => {
  return (
    <div className="following-block">
      <div className="row mt-5">
        <div className="title">
            My following
        </div>
        <FollowingBlockPerson name="Biba Bobov"/>
        <FollowingBlockPerson name="Marvin Merlin"/>
        <FollowingBlockPerson name="Robert Howard"/>
      </div>
    </div>
  );
};

export default FollowingBlock;
