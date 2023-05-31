import { search, mapImageResources, getFolders } from '@/helpers/cloudinary'

import { PortfolioWrapper } from '@/components/dom/Portfolio/PortfolioWrapper'
import { useStore } from '@/helpers/store'

async function getStillsData() {
  const results = await search({
    expression: 'folder=""',
  })

  const { resources, next_cursor: nextCursor, total_count: totalCount } = results
  const images = mapImageResources(resources)

  const { folders } = await getFolders()
  return { images, folders }
}

async function getYoutubeData() {
  const YT_PLAYLIST_ID = process.env.YT_PLAYLIST_ID
  const YT_API_KEY = process.env.YT_API_KEY
  const REQUEST_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${YT_PLAYLIST_ID}&key=${YT_API_KEY}&maxResults=15`
  const response = await fetch(REQUEST_URL)
  return response.json()
}

export default async function Page() {

   const stills = getStillsData()
  

    const yt = getYoutubeData();

    const [stillsData, motionData] = await Promise.all([stills, yt]);
    console.log("🚀 ~ file: layout.jsx:25 ~ RootLayout ~ motionData:", motionData)
    console.log("🚀 ~ file: layout.jsx:25 ~ RootLayout ~ stillsData:", stillsData)
    // const { setStillsData, setMotionData } = useStore()

      // setStillsData(stillsData)
      // setMotionData(motionData)

  return (
    <>
    <PortfolioWrapper motionData={motionData} stillsData={stillsData} />
    </>
  )
}


