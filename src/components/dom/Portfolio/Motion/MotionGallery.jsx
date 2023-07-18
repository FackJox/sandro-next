'use client'
import React from 'react'
import MotionPlayer from '@/components/dom/Portfolio/Motion/MotionPlayer'
import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


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
    setSelectedPlaylistId
  } = props

  const [activePlaylist, setActivePlaylist] = useState()

  useEffect(() => {
    console.log('activePlaylist', activePlaylist)
  }, [activePlaylist])


  function handleOnPlaylistClick(selectedPlaylistId) {
    setSelectedPlaylistId(selectedPlaylistId);
    console.log("playlistId", selectedPlaylistId)
  }

  useEffect(() => {
    console.log("VIDEOS", videos)
  }, [videos])

  const router = useRouter()



  return (
    <>
      <div className='z-10 flex-col flex-auto w-screen h-screen '>
        <div className='relative flex-col justify-center flex-auto h-1/5 '>
          <ul className='flex pt-[7.5%] align-center justify-center'>
            
           {playlists => {

             const isActive = playlist.id === activePlaylist
             console.log('FOLDERSZ', playlists)
             return (
               <li key={playlist.id} data-active-folder={isActive}>
                 
                 <button
                   data-playlist-path={playlist.id}
                   className='text-[1.1vw] uppercase tracking-[3.68px] leading-relaxed pt-[10%] font-normal font-BrandonReg text-icewhite'
                   onClick={() => router.push('/portfolio/motion')}
                 >
                   #all
                 </button>
               </li>
             )
                }
              }
            {playlists &&
              playlists.map((playlist) => {
                const isActive = playlist.id === activePlaylist
                console.log('FOLDERSZ', playlists)
                return (
                  <li key={playlist.id} data-active-folder={isActive}>
                    <button
                      data-playlist-path={playlist.id}
                      className='text-[1.1vw] uppercase tracking-[3.68px] leading-relaxed pt-[10%] font-normal font-BrandonReg text-icewhite'
                      onClick={() => handleOnPlaylistClick(playlist.id)}
                    >
                      #{playlist.snippet.localized.title}{' '}
                    </button>
                  </li>
                )
              })}
          </ul>

          <div className='grid justify-center w-screen grid-cols-4 gap-4  h-3/4 left-11'>
            {videos &&
              Array.isArray(videos) &&
              videos.map((video, index) => {
                // console.log('🚀 ~ file: MotionGallery.jsx:79 ~ results:', videos)
                return (
                  <div key={video.etag} className='flex flex-col items-center justify-center'>
                    <Image
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      width={1280}
                      height={720}
                    />
                    <h5 className='text-sm font-normal text-left text-icewhite'>{video.snippet.title}</h5>
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
                      <div className='w-12 rounded-full h-12'>

                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 2v20l18-10L6 2z' />
                      </svg>
                      </div>
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
      </div>
    </>
  )
}
