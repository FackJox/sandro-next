'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useStore } from '@/helpers/store'
import { AboutFirst } from '@/components/dom/About/AboutFirst'
import { AboutSecond } from '@/components/dom/About/AboutSecond'

import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'

export default function Page({ children }) {
  const ref = useRef()
  const { setSunCycle } = useStore()

  useEffect(() => {
    setSunCycle(true)
  }, [])

  return <AnimatePresence mode='wait'>{children}</AnimatePresence>
}
