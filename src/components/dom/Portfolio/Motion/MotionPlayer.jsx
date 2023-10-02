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


  return (
    <div className='grid w-screen h-screen grid-cols-4 grid-rows-6 gap-4'>
      <div className='col-start-1 row-start-3 cursor-pointer p-20'>
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
        <div>
          <p className='relative text-base text-center uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>
            Prev Video
          </p>
        </div>
      </div>
      <div className='col-start-4 row-start-3 cursor-pointer p-20'>
        <Image
          src={nextVideo.snippet.thumbnails.medium.url}
          alt={nextVideo.snippet.title}
          width={720}
          height={340}
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
        <div>
          <p className='relative text-base text-center uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>
            Next Video
          </p>
        </div>
      </div>

      <div className='h-10 col-span-2 col-start-2 row-start-5'>
        {' '}
        <p className='relative flex text-2xl font-bold text-left uppercase text-syellow'>
          {currentVideo.snippet.title}
        </p>
        <p className='relative flex text-xl text-left text-icewhite '>{currentVideo.snippet.description}</p>
      </div>

      <div className='flex relative object-contain justify-center items-center align-center aspect-video col-span-2 col-start-2 row-span-3 row-start-2 '>
        <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white'></div>
        <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white'></div>
        <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white'></div>
        <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white'></div>

        <div className='flex object-scale-down w-full h-3/4 items-center justify-center'>
          <YouTubeVideoPlayer id={currentVideo.id.videoId} playing={playing} />
          {/* <YouTubeVideoPlayer playing={playing} url={url} /> */}
        </div>
      </div>
    </div>
  )
}
