// app/search.route.js
import { search } from '@/helpers/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const params = JSON.parse(await request.text())

  const results = await search(params)

  return NextResponse.json({ ...results })
}
