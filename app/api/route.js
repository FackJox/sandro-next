// app/search.route.js
import { search, getFolders } from '@/helpers/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const params = JSON.parse(await request.text())

  const results = await search(params)
  const response = await getFolders(params)
  // console.log("🚀 ~ file: route.js:10 ~ POST ~ response:", response)
  // console.log("🚀 ~ file: route.js:9 ~ POST ~ results:", results)

  return NextResponse.json({ ...results, ...response })
}
