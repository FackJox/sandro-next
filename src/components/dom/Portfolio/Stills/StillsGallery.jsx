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
        <Image
          fill
          src={src}
          alt={alt}
          title={title}
          sizes={sizes}
          className={className}
          placeholder={src.blurDataURL ? 'blur' : undefined}
        />
      </div>
    </div>
  )

  return (
    <>
      <div className='z-10 flex-col flex-auto w-screen h-screen '>
        <div className='relative flex-col '>
          <div className='relative flex '>
            <div className='relative flex-col  mt-32 text-sm md:text-base justify-center items-center align-middle ml-auto mr-auto '>
              <p className='relative ml-3 md:ml-1 text-left w-1/2  uppercase tracking-wide md:tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>
                FILTERS:
              </p>
              <ul onClick={handleOnFolderClick} className='flex w-full'>
                <li key='all'>
                  <button
                    className='justify-center items-center ml-3 w-full md:ml-1 md:mr-1 h-full text-left tracking-wide md:tracking-[3.68px] uppercase leading-relaxed font-normal font-BrandonReg text-icewhite'
                  >
                    #all{' '}
                  </button>
                </li>

                {folders &&
                  folders.map((folder) => {
                    const isActive = folder.path === activeFolder
                    console.log('FOLDERSZ', folders)
                    return (
                      <li key={folder.path} data-active-folder={isActive}>
                        <button
                          data-folder-path={folder.path}
                          className='justify-center items-center ml-3 w-full md:ml-1 md:mr-1 h-full text-left tracking-wide md:tracking-[3.68px] uppercase leading-relaxed font-normal font-BrandonReg text-icewhite'
                        >
                          #{folder.name}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>

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
          <div className='relative items-center justify-center w-screen max-h-[66.66vh] p-6 overflow-y-auto'>
            <Gallery
              layout='masonry'
              photos={images}
              columns={(containerWidth) => {
                if (containerWidth < 640) return 1
                if (containerWidth < 768) return 2
                if (containerWidth < 1024) return 3
                return 4
              }}
              padding='18'
              spacing='0'
              width='100%'
              renderPhoto={NextJsImage}
              onClick={({ index }) => {
                console.log('CLICKBABS')
                setIndex(index)
              }}
            />
            <div>
              {totalCount && images && totalCount > images.length && (
                <p className='relative text-center w-full items-center align-center justify-center ml-3 md:ml-1 uppercase tracking-wide md:tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>

                  <button onClick={handleOnLoadMore}>Load More Results</button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
