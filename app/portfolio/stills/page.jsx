import { search, mapImageResources, getFolders } from '@/helpers/cloudinary'

import { PortfolioWrapper } from '@/components/dom/Portfolio/PortfolioWrapper'
import { useStore } from '@/helpers/store'
import { StillsWrapper } from '@/components/dom/Portfolio/Stills/StillsWrapper'

async function getStillsData() {
  const results = await search({
    expression: 'folder=""',
  })

  const { resources, next_cursor: nextCursor, total_count: totalCount } = results

  const images = resources ? mapImageResources(resources) : []

  const { folders } = await getFolders()
  return { images, folders }
}

export default async function Page() {
  const stills = getStillsData()
  const [stillsData] = await Promise.all([stills])

  return (
    <>
      <StillsWrapper stillsData={stillsData}/>
    </>
  )
}
