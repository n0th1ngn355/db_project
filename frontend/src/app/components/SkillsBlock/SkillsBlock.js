import Image from "next/image";
import Link from "next/link";
import './SkillsBlock.css';

const SkillsBlock = ({ id, has, name, update, take, untake }) => {
    return (
        <>
            <div className="followBlock-container">
                <div className="followBlock-info-wrapper">
                    <div className="followBlock-name-wrapper">
                        <h2 className="followBlock-name">
                            {name}
                        </h2>
                    </div>
                </div>
                {!has && (
                      <div className="followBlock-button-wrapper">
                          <button className="followBlock-button" onClick={()=>{take(id); update(true, id)}}>
                              <Image src="/CreatePostButton_black.svg" alt="addfollow" width={24} height={24}/>
                          </button>
                    </div>
                )}
                { has && (
                      <div className="followBlock-button-wrapper">
                          <button className="followBlock-button" onClick={()=>{untake(id); update(false, id)}}>
                              <Image src="/unfollow.svg" alt="unfollow" width={24} height={24}/>
                          </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default SkillsBlock;