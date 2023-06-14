'use client'
import React from 'react'
import MotionPlayer from '@/components/dom/Portfolio/Motion/MotionPlayer'
import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'

const ScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function MotionGallery(props) {
  const {
    playlists,
    videos,
    currentVideo,
    setCurrentVideo,
    prevVideo,
    setPrevVideo,
    setPlaying,
    nextVideo,
    setNextVideo,
    currentIndex,
    setCurrentIndex,
    toggleMotionPlayer,
  } = props

  const [activePlaylist, setActivePlaylist] = useState()

  function handleOnPlaylistClick(e) {
    const playlistPath = e.target.dataset.playlistPath
    setActivePlaylist(playlistPath)
  }

  return (
    <>
      <div className='z-10 flex-col flex-auto w-screen h-screen bg-syellow'>
        <div className='relative flex-col justify-center flex-auto h-screen '>
          <ul className='flex pt-[7.5%] align-center justify-center'>
            {playlists &&
              playlists.map((playlist) => {
                const isActive = playlist.etag === activePlaylist
                // console.log('FOLDERSZ', playlists)
                return (
                  <li key={playlist.etag} data-active-folder={isActive}>
                    <button
                      data-playlist-path={playlist.etag}
                      className='text-[1.1vw] uppercase tracking-[3.68px] leading-relaxed pt-[10%] font-normal font-BrandonReg text-icewhite'
                      onClick={handleOnPlaylistClick}
                    >
                      #{playlist.snippet.localized.title}{' '}
                    </button>
                  </li>
                )
              })}
          </ul>

          <div className='grid justify-center w-screen grid-cols-4 gap-4 h-3/4 left-11'>
            {videos &&
              Array.isArray(videos) &&
              videos.map((video, index) => {
                // console.log('🚀 ~ file: MotionGallery.jsx:79 ~ results:', videos)
                return (
                  <div key={video.etag} className='flex flex-col items-center'>
                    <Image
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      width={1280}
                      height={720}
                    />
                    <h5 className='text-sm font-normal text-left'>{video.snippet.title}</h5>
                    <button
                      className='flex font-normal text-left bg-red-500 text-icewhite'
                      onClick={() => {
                        setCurrentVideo(video)
                        const prevIndex = index === 0 ? videos.length - 1 : index - 1
                        const nextIndex = index === videos.length - 1 ? 0 : index + 1

                        setPrevVideo(videos[prevIndex])
                        setNextVideo(videos[nextIndex])

                        setCurrentIndex(index)
                        setPlaying(true)
                        toggleMotionPlayer()
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
          <Link href='/portfolio' className=''>
            <div className='inline-flex font-BrandonReg font-normal leading-[normal] text-icewhite'>
              <p className='absolute right-24 bottom-4 lg:bottom-6 h-8 w-[122px] lg:text-base tracking-[3.68px]'>
                BACK
              </p>
            </div>
          </Link>
          <div className='inline-flex'>
            <div className='absolute right-0 bottom-9 lg:bottom-12 h-[0] w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
          </div>
        </div>
      </div>
    </>
  )
}
