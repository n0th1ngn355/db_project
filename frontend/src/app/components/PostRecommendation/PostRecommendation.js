// components/Sidebar.js
import React from 'react';
import Image from "next/image";
import './PostRecommendation.css'

const PostRecommendation = ({ info }) => {
    return (
        <div className='row'>
            <div className='col-3'>
                <Image
                    className='image'
                    src="/recomendations.png"
                    alt="search"
                    width={62}
                    height={62}
                />
            </div>
            
            <div className='col'>
                <p className='row text-recom'>Quis ea amim et id magna proident voluptate...</p>
                <p className='row text-recom'>#java #vscode #baboons</p>
            </div>
        </div>
    );
};

export default PostRecommendation;
