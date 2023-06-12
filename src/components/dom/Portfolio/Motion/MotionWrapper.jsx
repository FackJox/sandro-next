'use client'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
// import { Lightbox, Fullscreen, Slideshow, Thumbnails, Zoom } from 'yet-another-react-lightbox'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { useEffect } from 'react'
import { mapImageResources } from '@/helpers/cloudinary'

// const PortfolioMenu = dynamic(
//   () => import('@/components/dom/portfolio/PortfolioMenu').then((mod) => mod.PortfolioMenu),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   },
// )
import MotionGallery from '@/components/dom/Portfolio/Motion/MotionGallery'
import MotionPlayer from '@/components/dom/Portfolio/Motion/MotionPlayer'
import StillsGallery from '@/components/dom/Portfolio/Stills/StillsGallery'

export function MotionWrapper({ motionData }) {
  console.log("🚀 ~ file: MotionWrapper.jsx:29 ~ MotionWrapper ~ motionData:", motionData)
  const [currentVideo, setCurrentVideo] = useState(motionData.videos.items[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevVideo, setPrevVideo] = useState(motionData.videos.items[0])
  const [nextVideo, setNextVideo] = useState(motionData.videos.items[0])
  const [playing, setPlaying] = useState(false)

  const url = 'https://www.youtube.com/watch?v=3pezSYoVje8'
  const [motionPlayerVisible, setMotionPlayerVisible] = useState(false)
  const toggleMotionPlayer = () => {
    setMotionPlayerVisible(!motionPlayerVisible)
  }

  const playlists = motionData.playlists.items
  const videos = motionData.videos.items



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
            videos={videos}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
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
