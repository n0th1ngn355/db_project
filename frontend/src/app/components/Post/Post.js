// components/Sidebar.js
import React from 'react';
import Image from "next/image";
import './Post.css'

const Post = ({ info }) => {
    return (
        <div className='row border mx-auto post mb-5'>
              <div class="mb-3">
                <div class="p-2 mt-3 row mx-auto">

                  <div className='col-1'>
                    <Image
                      className='image'
                      src="/user.svg"
                      alt="Пользователь"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className='col justify-content-center align-self-center'>
                    <p className='m-0'>John Doe</p>
                  </div>
                  <div className='mt-2'>
                    <p>
                    Laborum enim esse magna enim incididunt aliqua ad officia fugiat ad aliquip aute laboris non non sunt. 
                    Mollit Lorem est aliqua ipsum occaecat dolor eu nisi amet nostrud eu deserunt pariatur ut dolore. Veniam 
                    est sit cillum ullamco ea voluptate proident. In fugiat officia pariatur enim culpa deserunt est incididunt nisi 
                    ea enim.Est exercitation do enim tempor minim in ut magna ipsum reprehenderit fugiat nulla esse consectetur sint 
                    ipsum. Culpa ea cillum pariatur sint sunt consequat amet ea in nostrud repr
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
