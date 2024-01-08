// components/Sidebar.js
import React from 'react';
import Image from "next/image";
import './PostRecommendation.css'
import Link from "next/link";

const PostRecommendation = ({ name, text, likeAmount }) => {
    return (
        <>
            <Link className="postRecommendation-post-link" href={'/post/*postid*'}>
                <div className='row-1 mb-4 postRecommendation-container border'>
                    <div className="postRecommendation-content">
                        <div className="postRecommendation-header">
                            <p className="postRecommendation-user-name">{name}</p>
                            <Image src="/like.svg" alt="like" width={22} height={22}/>
                            <p className="postRecommendation-like-amount">{likeAmount}</p>
                        </div>
                        <div className="postRecommendation-post-text-wrapper">
                            <p className="postRecommendation-post-text">{text}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default PostRecommendation;
