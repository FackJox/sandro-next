'use client'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
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
import PortfolioMenu from './PortfolioMenu'
import MotionGallery from '@/components/dom/Portfolio/Motion/MotionGallery'
import MotionPlayer from '@/components/dom/Portfolio/Motion/MotionPlayer'
import StillsGallery from '@/components/dom/Portfolio/Stills/StillsGallery'

export function PortfolioWrapper({ motionData, stillsData }) {
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

  const {
    images: defaultImages,
    nextCursor: defaultNextCursor,
    totalCount: defaultTotalCount,
    folders: defaultFolders,
  } = stillsData

  const [images, setImages] = useState(defaultImages || [])
  const [folders, setFolders] = useState([])
  const [nextCursor, setNextCursor] = useState(defaultNextCursor)
  const [totalCount, setTotalCount] = useState(defaultTotalCount)
  const [activeFolder, setActiveFolder] = useState()
  const [index, setIndex] = useState(-1)

  console.log('images in ImageGallery', images)
  console.log('activeFolder in ImageGallery', activeFolder)
  console.log('folders in ImageGallery', folders)

  async function handleOnLoadMore(e) {
    e.preventDefault()

    const results = await fetch(' /api', {
      method: 'POST',
      body: JSON.stringify({
        expression: `folder=""`,
        nextCursor,
      }),
    }).then((r) => r.json())

    const { resources, next_cursor: nextPageCursor, total_count: updatedTotalCount, folders } = results

    const images = mapImageResources(resources)

    setImages((prev) => {
      return [...prev, ...images]
    })
    setNextCursor(nextPageCursor)
    setTotalCount(updatedTotalCount)
  }

  function handleOnFolderClick(e) {
    const folderPath = e.target.dataset.folderPath
    setActiveFolder(folderPath)
    setNextCursor(undefined)
    setImages([])
    setTotalCount(0)
  }

  useEffect(() => {
    ;(async function run() {
      const results = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({
          expression: `folder="${activeFolder || ''}"`,
        }),
      }).then((r) => r.json())

      const { resources, next_cursor: nextPageCursor, total_count: updatedTotalCount, folders } = results

      const images = mapImageResources(resources)
      setFolders(folders)
      setImages(images)
      setNextCursor(nextPageCursor)
      setTotalCount(updatedTotalCount)
    })()
  }, [activeFolder])



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
      >
        {/* <PortfolioMenu /> */}

        {/* {motionPlayerVisible ? (
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
        )} */}

        {/* <MotionPlayer url={url} playing={true} /> */}
        <StillsGallery
          images={images}
          folders={folders}
          handleOnFolderClick={handleOnFolderClick}
          activeFolder={activeFolder}
          setIndex={setIndex}
          totalCount={totalCount}
          handleOnLoadMore={handleOnLoadMore}
        />
        <Lightbox
          slides={images}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </motion.div>
    </AnimatePresence>
  )
}
