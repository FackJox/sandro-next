// app/search.route.js
import { search, getFolders } from '@/helpers/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const params = JSON.parse(await request.text())

  const results = await search(params)
  const response = await getFolders(params)


  return NextResponse.json({ ...results, ...response })
}
