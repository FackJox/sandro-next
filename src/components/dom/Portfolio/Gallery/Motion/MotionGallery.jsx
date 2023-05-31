'use client'
import React from 'react'
import { YouTubeVideoPlayer } from '@/components/dom/Portfolio/Gallery/Motion/MotionPlayer'
import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'

const ScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


export default function MotionGallery({
  motionData, folders
}) {
    console.log('🚀 ~ file: MotionGallery.jsx:11 ~ motionData:', motionData)
 
    const [currentVideo, setCurrentVideo] = useState(motionData.items[0])
    const [playing, setPlaying] = useState(false)

  const results = motionData
  console.log("🚀 ~ file: MotionGallery.jsx:17 ~ results:", results)


  return (
    <>
      <div className='z-10 flex-col flex-auto w-screen h-screen bg-syellow'>
        <div className='relative flex-col justify-center flex-auto h-screen align-center'>
          <ul className='flex pt-[7.5%] align-center justify-center'>
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
          <div className='justify-center w-screen h-3/4 left-11'>
            {/* <Gallery
              layout='masonry'
              photos={images}
              // columns='3'
              // padding='18'
              // spacing='0'
              // width='100%'
              // renderPhoto={NextJsImage}
            /> */}
            {results.items &&
              Array.isArray(results.items) &&
              results.items.map((video) => {
                console.log("🚀 ~ file: MotionGallery.jsx:79 ~ results:", results)
                return (
                  <div key={video.id} className='flex mx-8'>
                    <img
                      src={video.snippet.thumbnails.maxres.url}
                      alt={video.snippet.title}
                      width={1280}
                      height={720}
                    />
                    <h5 className='flex mb-2 text-sm font-normal text-left no-wrap'>{video.snippet.title}</h5>
                    <button
                      className='flex font-normal text-left text-white bg-red-500'
                      onClick={() => {
                        setCurrentVideo(video)
                        setPlaying(true)
                        ScrollTop()
                      }}
                    >
                      Play Now!
                    </button>
                  </div>
                )
              })}
          </div>
          <div>
            <p>
              <button>Load More Results</button>
            </p>
          </div>
        </div>
        <div>
          <div className='inline-flex font-BrandonReg font-normal leading-[normal] text-lwhite'>
            <p className='absolute right-24 bottom-4 lg:bottom-6 h-8 w-[122px] lg:text-base tracking-[3.68px]'>
              SCROLL
            </p>
          </div>
          <div className='inline-flex'>
            <div className='absolute right-0 bottom-9 lg:bottom-12 h-[0] w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
          </div>
        </div>
      </div>
    </>
  )
}
