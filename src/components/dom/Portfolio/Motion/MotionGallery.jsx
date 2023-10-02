'use client'
import React, { useEffect, useRef, useState, Suspense } from 'react'
import MotionPlayer from '@/components/dom/Portfolio/Motion/MotionPlayer'
import Image from 'next/image'
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
    setSelectedPlaylistId,
    setPlaylistVideos,
  } = props
  // console.log("🚀 ~ file: MotionGallery.jsx:28 ~ MotionGallery ~ videos:", videos)
  // console.log("🚀 ~ file: MotionGallery.jsx:28 ~ MotionGallery ~ playlists:", playlists)

  const [activePlaylist, setActivePlaylist] = useState()

  useEffect(() => {
    console.log('activePlaylist', activePlaylist)
  }, [activePlaylist])

  function handleOnPlaylistClick(selectedPlaylistId) {
    console.log('🚀 ~ file: MotionGallery.jsx:39 ~ handleOnPlaylistClick ~ selectedPlaylistId:', selectedPlaylistId)
    setSelectedPlaylistId(selectedPlaylistId)
    if (!selectedPlaylistId) {
      setPlaylistVideos(videos.items)
    }
  }

  useEffect(() => {
    console.log('🚀 ~ file: MotionGallery.jsx:43 ~ useEffect ~ videos:', videos)
  }, [videos])

  const router = useRouter()

  useEffect(() => {
    const parentDivs = document.querySelectorAll('.parentDiv')
    const buttonDivs = document.querySelectorAll('.buttonDiv')
    const mouseoverListeners = []
    const mouseoutListeners = []

    parentDivs.forEach((parentDiv, index) => {
      const mouseover = () => {
        buttonDivs[index].className =
          'buttonDiv opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex font-normal text-left '
      }
      const mouseout = () => {
        buttonDivs[index].className =
          'buttonDiv opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex font-normal text-left '
      }

      parentDiv.addEventListener('mouseover', mouseover)
      parentDiv.addEventListener('mouseout', mouseout)

      mouseoverListeners.push(mouseover)
      mouseoutListeners.push(mouseout)
    })

    return () => {
      parentDivs.forEach((parentDiv, index) => {
        parentDiv.removeEventListener('mouseover', mouseoverListeners[index])
        parentDiv.removeEventListener('mouseout', mouseoutListeners[index])
      })
    }
  }, [])

  return (
    <>
      <div className='z-10 flex w-screen h-screen '>
        <div className='relative flex-col '>
          <div className='relative flex '>
            <div className='relative flex-col  mt-32 justify-center items-center align-middle ml-auto mr-auto'>
              <p className='relative ml-3 text-left w-1/2 text-base uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>
                FILTERS:
              </p>
              <ul className='flex w-full '>
                <li key='all'>
                  <button
                    className='justify-center items-center w-full ml-3 mr-3 h-full text-left text-base uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'
                    onClick={() => handleOnPlaylistClick()}
                  >
                    #all{' '}
                  </button>
                </li>

                {playlists &&
                  playlists.map((playlist) => {
                    const isActive = playlist.id === activePlaylist
                    // console.log('FOLDERSZ', playlists)
                    return (
                      <li key={playlist.id} data-active-folder={isActive}>
                        <button
                          className=' w-full h-full ml-3 mr-3 text-left text-base uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'
                          onClick={() => handleOnPlaylistClick(playlist.id)}
                        >
                          {' '}
                          #{playlist.snippet.localized.title}{' '}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>

          <div className='relative grid w-screen p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-2/3 overflow-auto scrollbar-hide '>
            {videos &&
              Array.isArray(videos) &&
              videos.map((video, index) => {
                // console.log('🚀 ~ file: MotionGallery.jsx:79 ~ results:', videos)

                let title = video.snippet.title.replace(/&AMP;/gi, '&')
                title = title.replace(/&#39;/gi, "'")
                console.log('🚀 ~ file: MotionGallery.jsx:130 ~ MotionGallery ~ title:', title)

                return (
                  <div key={video.etag} className='parentDiv relative flex flex-col items-center justify-center w-full'>
                    <Image
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      width={1280}
                      height={720}
                    />
                    <button
                      className='buttonDiv opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex font-normal text-left'
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
                      <div className='w-12 rounded-full h-12 mt-4 m-auto'>
                        <svg
                          fill='#ffaf31'
                          height='32px'
                          width='32px'
                          version='1.1'
                          id='Layer_1'
                          xmlns='http://www.w3.org/2000/svg'
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                          viewBox='0 0 512.00 512.00'
                          xmlSpace='preserve'
                          style={{ '--darkreader-inline-fill': '#9e6000', '--darkreader-inline-stroke': '#e6a136' }}
                          data-darkreader-inline-fill=''
                          stroke='#ffaf31'
                          strokeWidth='0.00512'
                          data-darkreader-inline-stroke=''
                        >
                          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                          <g
                            id='SVGRepo_tracerCarrier'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            stroke='#CCCCCC'
                            strokeWidth='6.144'
                            style={{ '--darkreader-inline-stroke': '#b4b0a9' }}
                            data-darkreader-inline-stroke=''
                          ></g>
                          <g id='SVGRepo_iconCarrier'>
                            <g>
                              <g>
                                <path d='M500.203,236.907L30.869,2.24c-6.613-3.285-14.443-2.944-20.736,0.939C3.84,7.083,0,13.931,0,21.333v469.333 c0,7.403,3.84,14.251,10.133,18.155c3.413,2.112,7.296,3.179,11.2,3.179c3.264,0,6.528-0.747,9.536-2.24l469.333-234.667 C507.435,271.467,512,264.085,512,256S507.435,240.533,500.203,236.907z'></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </button>
                    <div className='w-full flex relative'>
                      <p className='relative text-base truncate uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>
                        {title}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
