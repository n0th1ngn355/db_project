import Image from "next/image";
import Link from "next/link";
import './FollowingFollowerBlock.css';

const FollowingFollowerBlock = ({ type, id, name, update, desc, isFollow, follow, unfollow }) => {
    return (
        <>
            <div className="followBlock-container">
                <Link className="followBlock-link" href={`/profile/${id}`}>
                    <div className="followBlock-content">
                        <div className="followBlock-avatar-wrapper">
                            <Image src="/avatar.svg" alt="avatar" width={52} height={52} />
                        </div>
                        <div className="followBlock-info-wrapper">
                            <div className="followBlock-name-wrapper">
                                <h2 className="followBlock-name">
                                    {name}
                                </h2>
                            </div>
                            {type === 'following' && desc && (
                                <>
                                    <div className="followBlock-desc-wrapper">
                                        <p className="followBlock-desc">
                                            {desc}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Link>
                {type === 'follower' && !isFollow && (
                      <div className="followBlock-button-wrapper">
                          <button className="followBlock-button" onClick={()=>{follow(id); update(true, id)}}>
                              <Image src="/addfollow.svg" alt="addfollow" width={24} height={24}/>
                          </button>
                    </div>
                )}
                {type === 'following' && (
                      <div className="followBlock-button-wrapper">
                          <button className="followBlock-button" onClick={()=>{unfollow(id); update(false, id)}}>
                              <Image src="/unfollow.svg" alt="unfollow" width={24} height={24}/>
                          </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default FollowingFollowerBlock;