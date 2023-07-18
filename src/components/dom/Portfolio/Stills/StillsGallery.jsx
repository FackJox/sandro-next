'use client'
import React from 'react'
import Gallery from 'react-photo-album'
// import photos from '../../helpers/photos'
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function StillsGallery(props) {
  const { images, folders, handleOnFolderClick, activeFolder, setIndex, totalCount, handleOnLoadMore, imageProps } = props

  console.log('🚀 ~ file: StillsGallery.jsx:27 ~ StillsGallery ~ images:', images)

  console.log('🚀 ~ file: StillsGallery.jsx:30 ~ StillsGallery ~ folders:', folders)

  const NextJsImage = ({ imageProps: { src, alt, title, sizes, className, onClick }, wrapperStyle }) => (
    <div style={wrapperStyle} onClick={onClick}>
      <div style={{ display: 'block', position: 'relative', width: '100%', height: '100%' }}>
        <Image fill src={src} alt={alt} title={title} sizes={sizes} className={className} />
      </div>
    </div>
  )

  return (
    <>
      <div className='z-10 flex-col flex-auto w-screen h-screen bg-syellow'>
        <div className='relative flex-col justify-center flex-auto align-center h-screen'>
          <ul onClick={handleOnFolderClick} className='flex pt-[7.5%] align-center justify-center'>
            {folders &&
              folders.map((folder) => {
                const isActive = folder.path === activeFolder
                console.log('FOLDERSZ', folders)
                return (
                  <li key={folder.path} data-active-folder={isActive}>
                    <button
                      data-folder-path={folder.path}
                      className='text-[1.1vw] uppercase tracking-[3.68px] leading-relaxed pt-[10%] font-normal font-BrandonReg text-icewhite'
                    >
                      #{folder.name}
                    </button>
                  </li>
                )
              })}
          </ul>
          {/*<div className='grid w-screen h-screen grid-cols-3 grid-rows-4 '>
             <div className='fixed top-0 left-0 w-screen'>
              <div className='fixed left-[70px] top-28 text-base text-left text-white h-4 w-44'>FILTERS</div>
              <div className='h-4 fixed left-[70px] top-36 text-sm text-left uppercase text-white row-start-2 w-44'>
                #mountains
              </div>
              <div className='fixed left-[70px] top-44 text-sm text-left uppercase text-white h-4 row-start-2 w-44'>
                #portraits
              </div>
              <div className='fixed left-[304px] top-36 text-sm text-left uppercase text-white h-4 row-start-2 w-44'>
                #partnerships
              </div>
              <div className='fixed left-[538px] top-36 text-sm text-left uppercase text-white h-4 row-start-3 w-44'>
                #Sherpas
              </div>
              <div className='fixed left-[538px] top-[177px] text-sm text-left uppercase text-white h-4 row-start-3 w-44'>
                #Military
              </div>
              <div className='fixed left-[304px] top-44 text-sm text-left uppercase text-white h-4 row-start-3 w-44'>
                #DRONE
              </div>
            </div>
          </div> */}
          <div className='  w-screen h-3/4 left-11 justify-center'>
            <Gallery
              layout='masonry'
              photos={images}
              // columns='3'
              // padding='18'
              // spacing='0'
              // width='100%'
              renderPhoto={NextJsImage}
              onClick={({ index }) => {
                console.log('CLICKBABS')
                setIndex(index)
              }}
            />
          </div>
          <div>
            {totalCount && images && totalCount > images.length && (
              <p>
                <button onClick={handleOnLoadMore}>Load More Results</button>
              </p>
            )}
          </div>
        </div>
      
      </div>
    </>
  )
}
