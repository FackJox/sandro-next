
'use client'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

const YouTubeVideoPlayer = (props) => {
  const { id, playing, url } = props
  console.log("🚀 ~ file: MotionPlayer.jsx:7 ~ YouTubeVideoPlayer ~ id:", id)

  // const url = `https://www.youtube.com/watch?v=${id}`

  return <ReactPlayer className='object-scale-down' url={url} playing={playing} />
}

export default function MotionPlayer(props)  {
  const { currentVideo, playing, url } = props
  console.log('🚀 ~ file: MotionPlayer.jsx:22 ~ MotionPlayer ~ video:', currentVideo)

  
  
  return (
    <div className='grid w-screen h-screen grid-cols-4 grid-rows-6 gap-4'>
      <div className='col-start-1 row-start-3'>
        <img className='w-52 h-[308px] ' src='dsc07226.png' />
      </div>
      <div className='col-start-4 row-start-3'>
        {' '}
        <img className='w-[407px] h-[308px]  ' src='dsc07135.png' />
      </div>
      <div className='col-span-2 col-start-2 row-start-5'>
        {' '}
        <p className='flex w-[199px] h-[19px]  text-2xl font-bold text-left uppercase text-[#fcc600]'>Video Title</p>
      </div>
      <div className='col-span-2 col-start-2 row-start-6'>
        <p className='flex text-xl text-left text-white '>
          This video discription is the best video descrptiption money can buy, kt is full of wonder and amazement. I am
          so hapy to be righting this video diecscption as it makes me so happy to be writing it.
        </p>
      </div>
      <div className='relative flex justify-center col-span-2 col-start-2 row-span-3 row-start-2 align-middle '>
        <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white'></div>
        <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white'></div>
        <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white'></div>
        <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white'></div>
        <div className='relative justify-center object-scale-down align-middle'>
          {/* <YouTubeVideoPlayer id={currentVideo.id.videoId} playing={playing} /> */}
          <YouTubeVideoPlayer playing={playing} url={url} />
        </div>
      </div>
    </div>
  )
}
