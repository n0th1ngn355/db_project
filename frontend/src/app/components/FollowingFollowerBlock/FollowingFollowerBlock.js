import Image from "next/image";
import Link from "next/link";
import './FollowingFollowerBlock.css';

const FollowingFollowerBlock = ({ type, name, desc }) => {
    return (
        <>
            <div className="followBlock-container">
                <Link className="followBlock-link" href={`/profile/${name}`}>
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
                {type === 'following' && (
                    <div className="followBlock-button-wrapper">
                        <>
                            
                        </>
                    </div>
                )}
            </div>
        </>
    );
}

export default FollowingFollowerBlock;