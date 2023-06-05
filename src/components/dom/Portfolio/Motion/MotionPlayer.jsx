
'use client'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false })

const YouTubeVideoPlayer = (props) => {
  const { id, playing } = props
  console.log("🚀 ~ file: MotionPlayer.jsx:7 ~ YouTubeVideoPlayer ~ id:", id)

  const url = `https://www.youtube.com/watch?v=${id}`

  return (
    <div className='flex w-full h-full'>
      <ReactPlayer className='react-player' url={url} playing={playing} width='100%' height='100%' />
    </div>
  )
}

// console.log('incomponentYouTubeVideoPlayer', YouTubeVideoPlayer)
export default function MotionPlayer()  {
  
  return (
    <div className='p-4 mx-auto my-8 rounded-lg max-w-720 border-xl'>
  <YouTubeVideoPlayer id={currentVideo.snippet.resourceId.videoId} playing={playing} />
</div>

  )
}
