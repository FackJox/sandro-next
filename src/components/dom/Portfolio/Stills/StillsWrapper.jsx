'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import { useEffect } from 'react'
import { mapImageResources } from '@/helpers/cloudinary'

import StillsGallery from '@/components/dom/Portfolio/Stills/StillsGallery'

export function StillsWrapper({ stillsData }) {
 
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
