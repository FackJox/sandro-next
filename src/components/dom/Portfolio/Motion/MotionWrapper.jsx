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

 
  console.log("🚀 ~ file: MotionWrapper.jsx:29 ~ MotionWrapper ~ motionData:", motionData)
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
    console.log("plVideos", plVideos)
  }


   useEffect(() => {
     if (selectedPlaylistId) {
       onPlaylistChange(selectedPlaylistId)
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
            <div className='relative bg-white'>
              <button className='absolute top-0 right-0 p-2' onClick={toggleMotionPlayer}>
                Close
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
