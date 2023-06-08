'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

const YouTubeVideoPlayer = (props) => {
  const { id, playing } = props

  const url = `https://www.youtube.com/watch?v=${id}`

  return <ReactPlayer className='object-scale-down' url={url} playing={playing} />
}

export default function MotionPlayer(props) {
  const {
    playing,
    setPlaying,
    url,
    currentVideo,
    setCurrentVideo,
    prevVideo,
    setPrevVideo,
    nextVideo,
    setNextVideo,
    currentIndex,
    setCurrentIndex,
    videos,
  } = props
  // console.log('🚀 ~ file: MotionPlayer.jsx:17 ~ MotionPlayer ~ currentVideo:', currentVideo)
  // console.log('🚀 ~ file: MotionPlayer.jsx:17 ~ MotionPlayer ~ nextVideo:', nextVideo)
  // console.log('🚀 ~ file: MotionPlayer.jsx:17 ~ MotionPlayer ~ prevVideo:', prevVideo)

  return (
    <div className='grid w-screen h-screen grid-cols-4 grid-rows-6 gap-4'>
      <div className='col-start-1 row-start-3 cursor-pointer'>
        <Image
          src={prevVideo.snippet.thumbnails.medium.url}
          alt={prevVideo.snippet.title}
          width={1280}
          height={720}
          onClick={() => {
            setCurrentVideo(prevVideo)

            const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1
            const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1

            setPrevVideo(videos[prevIndex])
            setNextVideo(videos[nextIndex])
            setCurrentIndex(prevIndex)

            setPlaying(true)
          }}
        />
      </div>
      <div className='col-start-4 row-start-3 cursor-pointer'>
        <Image
          src={nextVideo.snippet.thumbnails.medium.url}
          alt={nextVideo.snippet.title}
          width={1280}
          height={720}
          onClick={() => {
            setCurrentVideo(nextVideo)

            const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1
            const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1

            setPrevVideo(videos[prevIndex])
            setNextVideo(videos[nextIndex])
            setCurrentIndex(nextIndex)
            setPlaying(true)
          }}
        />
      </div>
      <div className='col-span-2 col-start-2 row-start-5'>
        {' '}
        <p className='flex w-[199px] h-[19px]  text-2xl font-bold text-left uppercase text-[#fcc600]'>
          {currentVideo.snippet.title}
        </p>
      </div>
      <div className='col-span-2 col-start-2 row-start-6'>
        <p className='flex text-xl text-left text-white '>{currentVideo.snippet.description}</p>
      </div>
      <div className='relative flex justify-center col-span-2 col-start-2 row-span-3 row-start-2 align-middle '>
        <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white'></div>
        <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white'></div>
        <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white'></div>
        <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white'></div>
        <div className='relative justify-center object-scale-down align-middle'>
          <YouTubeVideoPlayer id={currentVideo.id.videoId} playing={playing} />
          {/* <YouTubeVideoPlayer playing={playing} url={url} /> */}
        </div>
      </div>
    </div>
  )
}
