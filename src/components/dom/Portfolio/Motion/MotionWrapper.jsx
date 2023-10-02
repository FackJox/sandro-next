'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import { useStore } from '@/helpers/store'

import MotionGallery from '@/components/dom/Portfolio/Motion/MotionGallery'
import MotionPlayer from '@/components/dom/Portfolio/Motion/MotionPlayer'

export function MotionWrapper({ motionData }) {

 
  // console.log("🚀 ~ file: MotionWrapper.jsx:29 ~ MotionWrapper ~ motionData:", motionData)
  const [currentVideo, setCurrentVideo] = useState(motionData.videos.items[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevVideo, setPrevVideo] = useState(motionData.videos.items[0])
  const [nextVideo, setNextVideo] = useState(motionData.videos.items[0])
  const [playing, setPlaying] = useState(false)
  const [playlistVideos, setPlaylistVideos] = useState(motionData.videos.items);
  const { setSunCycle } = useStore()

  useEffect(() => {
    setSunCycle(false)
  }, [])
  const [motionPlayerVisible, setMotionPlayerVisible] = useState(false)
  const toggleMotionPlayer = () => {
    setMotionPlayerVisible(!motionPlayerVisible)
  }

  usePlayAnimations(2)

  const playlists = motionData.playlists.items
  const videos = motionData.videos.items

   const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)

  const onPlaylistChange = (playlistId) => {
    let plVideos;
    if (playlistId && motionData.plVideos.hasOwnProperty(playlistId)) {
      plVideos = motionData.plVideos[playlistId].items;
    } else {
      plVideos = motionData.videos;
    }
    setPlaylistVideos(plVideos);
    console.log("🚀 ~ file: MotionWrapper.jsx:48 ~ onPlaylistChange ~ plVideos:", plVideos)
  }



useEffect(() => {
  if (selectedPlaylistId) {
    console.log('🚀 ~ file: MotionWrapper.jsx:54 ~ useEffect ~ selectedPlaylistId:', selectedPlaylistId)
    onPlaylistChange(selectedPlaylistId)
  } else {
    setPlaylistVideos(motionData.videos.items)
  }
}, [selectedPlaylistId])



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
      >
        {motionPlayerVisible ? (
          <div className='fixed z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity/50'>
            <div className='relative bg-black'>
              <button className='absolute text-syellow top-0 right-0 p-2' onClick={toggleMotionPlayer}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  aria-hidden='true'
                  focusable='false'
                  class='yarl__icon'
                >
                  <g fill='currentColor'>
                    <path d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
                  </g>
                </svg>
              </button>
              <MotionPlayer
                currentVideo={currentVideo}
                prevVideo={prevVideo}
                nextVideo={nextVideo}
                playing={playing}
                setPlaying={setPlaying}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                videos={videos}
                setCurrentVideo={setCurrentVideo}
                setPrevVideo={setPrevVideo}
                setNextVideo={setNextVideo}
                toggleMotionPlayer={toggleMotionPlayer}
              />
            </div>
          </div>
        ) : (
          <MotionGallery
            videos={playlistVideos}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setSelectedPlaylistId={setSelectedPlaylistId}
            currentVideo={currentVideo}
            setPlaylistVideos={setPlaylistVideos}
            prevVideo={prevVideo}
            nextVideo={nextVideo}
            setCurrentVideo={setCurrentVideo}
            setPrevVideo={setPrevVideo}
            setNextVideo={setNextVideo}
            playlists={playlists}
            playing={playing}
            setPlaying={setPlaying}
            toggleMotionPlayer={toggleMotionPlayer}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
