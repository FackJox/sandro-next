import { search, mapImageResources, getFolders } from '@/helpers/cloudinary'
import { useStore } from '@/helpers/store'
import { MotionWrapper } from '@/components/dom/Portfolio/Motion/MotionWrapper'


async function getYoutubeData() {
  const YT_PLAYLIST_ID = process.env.YT_PLAYLIST_ID
  const YT_API_KEY = process.env.YT_API_KEY
  const YT_CHANNEL_ID = process.env.YT_CHANNEL_ID
  const MAX_RESULTS = `15`
  const REQUEST_URL_PLVIDEOS = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${YT_PLAYLIST_ID}&key=${YT_API_KEY}&maxResults=15`
  const REQUEST_URL_PLAYLISTS = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${YT_CHANNEL_ID}&key=${YT_API_KEY}`
  const REQUEST_URL_ALLVIDEOS = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YT_CHANNEL_ID}&maxResults=${MAX_RESULTS}&order=date&key=${YT_API_KEY}`

  const [responseVideos, responsePlaylists, responsePLVideos] = await Promise.all([
    fetch(REQUEST_URL_ALLVIDEOS),
    fetch(REQUEST_URL_PLAYLISTS),
    fetch(REQUEST_URL_PLVIDEOS),
  ])

  const dataAllVideos = await responseVideos.json()
  const dataPlaylists = await responsePlaylists.json()
  const dataPLVideos = await responsePLVideos.json()
  console.log('🚀 ~ file: page.jsx:32 ~ getYoutubeData ~ dataPlaylists:', dataPlaylists, dataPLVideos)

  return { videos: dataAllVideos, playlists: dataPlaylists, plVideos: dataPLVideos }
}

export default async function Page() {
  const yt = getYoutubeData()
  const [ motionData] = await Promise.all([yt])


  return (
    <>
      <MotionWrapper motionData={motionData}/>
    </>
  )
}