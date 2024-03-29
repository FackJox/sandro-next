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

   let title = currentVideo.snippet.title.replace(/&AMP;/gi, '&')
   title = title.replace(/&#39;/gi, "'") 

  return (
    <div className='grid w-screen h-screen grid-cols-4 grid-rows-6 gap-4 '>
      <div className='flex relative justify-center items-center align-center aspect-video col-span-4 col-start-1  md:col-span-2 md:col-start-2 row-span-3 row-start-2 '>
        <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white'></div>
        <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white'></div>
        <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white'></div>
        <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white'></div>

        <div className='flex object-scale-down w-full h-full aspect-video items-center justify-center p-10'>
          <YouTubeVideoPlayer id={currentVideo.id.videoId} playing={playing} />
          {/* <YouTubeVideoPlayer playing={playing} url={url} /> */}
        </div>
      </div>

      <div className='col-start-2 row-start-6 md:col-start-1 md:row-start-3 cursor-pointer -mb-20 md:p-20'>
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
          <p className='relative text-sm md:text-base text-center uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>
            Prev Video
          </p>
        </div>
      </div>
      <div className='col-start-3 row-start-6 md:col-start-4 md:row-start-3 cursor-pointer -mb-20 md:p-20'>
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
          <p className='relative text-sm md:text-base text-center uppercase tracking-[3.68px] leading-relaxed font-normal font-BrandonReg text-icewhite'>
            Next Video
          </p>
        </div>
      </div>

      <div className='h-10 col-span-2 col-start-2 sm:row-start-5 row-start-4 pt-10 -m-8'>
        {' '}
        <p className='relative flex text-xl md:text-2xl font-bold text-left uppercase text-syellow'>{title}</p>
        <p className='relative flex text-lg md:text-xl text-left text-icewhite '>{currentVideo.snippet.description}</p>
      </div>
    </div>
  )
}
