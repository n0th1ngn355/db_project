// components/Sidebar.js
import React from 'react';
import Image from "next/image";
import './Post.css'

const Post = ({ name, info }) => {
    return (
        <div className='row border mx-auto post mb-5'>
              <div class="mb-3">
                <div class="p-2 mt-3 row mx-auto">

                  <div className='col-1'>
                    <Image
                      className='image'
                      src="/avatar.svg"
                      alt="avatar"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className='col justify-content-center align-self-center'>
                    <p className='m-0'>{name}</p>
                  </div>
                  <div className='mt-2'>
                    <p>
                      {info}
                    </p>
                  </div>

                  <div className='mt-3'>
                    <p>2 часа назад</p>
                  </div>

                  <div className='d-flex'>
                    <div className='col-3'>
                      <Image
                        className='image'
                        src="/recomendations.png"
                        alt="Рекомендации"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className='col'> 
                      <div className='row-1 mt-1'>
                        ChatGPT на JAVA. Пишем "Hello Wolrd" на Spring
                      </div>
                      <div className='row-1 mt-3'>
                        <a href='https://habr.com/ru/articles/784128/'>https://habr.com/ru/articles/784128/</a>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='d-flex col-2'>
                      <button className='btn'>
                        <Image
                          className='image'
                          src="/heart.png"
                          alt="Лайк"
                          width={24}
                          height={24}
                        />
                      </button>
                      <p className='col mb-0 mt-2'>
                        35
                      </p>
                    </div>
                    <div className='col-3'>
                      <div className='d-flex col-2'>
                        <button className='btn'>
                          <Image
                            className='image'
                            src="/comments.png"
                            alt="Комментарии"
                            width={24}
                            height={24}
                          />
                        </button>
                        <p className='col mb-0 mt-2'>
                          Комментарии
                        </p>
                      </div>
                    </div>
                    <div className='col-4 mx-4'>
                      <div className='d-flex col-2'>
                        <button className='btn'>
                          <Image
                            className='image'
                            src="/share.png"
                            alt="Поделиться"
                            width={24}
                            height={24}
                          />
                        </button>
                        <p className='col mb-0 mt-2'>
                          Поделиться
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
};

export default Post;
