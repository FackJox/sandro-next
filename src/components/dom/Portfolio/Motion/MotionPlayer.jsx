
'use client'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

const YouTubeVideoPlayer = (props) => {
  const { id, playing, url } = props
  console.log("🚀 ~ file: MotionPlayer.jsx:7 ~ YouTubeVideoPlayer ~ id:", id)

  // const url = `https://www.youtube.com/watch?v=${id}`

  return (

      <ReactPlayer className='react-player' url={url} playing={playing}  />
   
  )
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
        <p className='flex w-[199px] h-[19px]  text-2xl font-bold text-left uppercase text-[#fcc600]'>
          Video Title
        </p>
      </div>
      <div className='col-span-2 col-start-2 row-start-6'>
        <p className='flex text-xl text-left text-white '>
          This video discription is the best video descrptiption money can buy, kt is full of wonder and amazement. I am
          so hapy to be righting this video diecscption as it makes me so happy to be writing it.
        </p>
      </div>
      <div className='flex justify-center col-span-2 col-start-2 row-span-3 row-start-2 align-middle '>
        <svg
          width={46}
          height={37}
          viewBox='0 0 46 37'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-[46px] h-[37px] '
          preserveAspectRatio='none'
        >
          <path
            d='M16.2495 5.75507L22.9195 14.5102L31.257 9.03882L39.5926 25.4499H6.24835L16.2495 5.75507Z'
            stroke='#F3982A'
            stroke-width={4}
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M10.1718 19.6902C14.5398 18.0375 18.9079 18.1839 23.2741 20.1342C27.8434 22.1784 32.4281 22.2416 36.9955 20.3346'
            stroke='#F3982A'
            stroke-width={4}
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path d='M6.28088 31.2824L39.5256 31.2199L6.28088 31.2824Z' fill='#D8D8D8' />
          <path
            d='M6.28088 31.2824L39.5256 31.2199'
            stroke='#F3982A'
            stroke-width={4}
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        <div className='w-[1022px] h-[641px] justify-center align-middle'>
          {/* <YouTubeVideoPlayer id={currentVideo.id.videoId} playing={playing} /> */}
          <YouTubeVideoPlayer  playing={playing} url={url} />
        </div>
        <svg
          width={1080}
          height={696}
          viewBox='0 0 1080 696'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-[1080px] h-[695px]'
          preserveAspectRatio='none'
        >
          <line x1='1000.04' y1={1} x2='1077.87' y2='1.00001' stroke='white' stroke-opacity='0.8' stroke-width={2} />
          <line x1={1079} y1={78} x2={1079} y2='-4.09997e-8' stroke='white' stroke-opacity='0.8' stroke-width={2} />
          <line
            x1='1.13228'
            y1={78}
            x2='1.13228'
            y2='-4.09997e-8'
            stroke='white'
            stroke-opacity='0.8'
            stroke-width={2}
          />
          <line x1='83.1589' y1={1} x2='2.13228' y2={1} stroke='white' stroke-opacity='0.8' stroke-width={2} />
          <line x1={1079} y1={695} x2={1079} y2={619} stroke='white' stroke-opacity='0.8' stroke-width={2} />
          <line x1='996.841' y1={694} x2='1077.87' y2={694} stroke='white' stroke-opacity='0.8' stroke-width={2} />
          <line
            y1={-1}
            x2='81.0267'
            y2={-1}
            transform='matrix(-1 2.05459e-05 -2.33536e-05 -1 83.1589 693)'
            stroke='white'
            stroke-opacity='0.8'
            stroke-width={2}
          />
          <line x1={1} y1={617} x2={1} y2={695} stroke='white' stroke-opacity='0.8' stroke-width={2} />
        </svg>
      </div>
    </div>
  )
}
