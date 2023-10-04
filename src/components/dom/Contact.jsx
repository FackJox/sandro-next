import Image from 'next/image'
import Link from 'next/link'

export function Contact() {
  return (
    <div className='flex-col items-center justify-center h-full w-screen align-middle'>
      <div className='flex h-1/4'></div>

      <div className='h-1/2 grid grid-cols-2 grid-rows-5 place-items-center justify-items-center '>
        <div className='flex items-center col-span-2 row-start-2'>
          <p className='w-[860px]  text-center text-5xl md:text-6xl font-bold text-syellow'>CONNECT</p>
        </div>
        <div className='flex items-center col-span-2 row-start-3 pt-8 md:pt-0'>
          <p className='w-screen md:w-[827px]  text-center text-xl md:text-4xl text-syellow px-4'>
            If your story involves mountains or people, I&apos;d love to help tell it.
          </p>
        </div>
        <div className='flex items-center col-span-2 row-start-4'>
          <p className='w-[860px] text-center text-xl md:text-4xl font-medium uppercase text-gold'>
            sandro.gromen-hayes@live.com
          </p>
        </div>
          <div className='flex items-center row-start-5'>
        <Link href='https://www.youtube.com/@SandroGH5' className='' rel='noopener noreferrer' target='_blank'>
            <Image src='/img/contact/yt.svg' alt='youtube' width={62} height={62} />
        </Link>
          </div>

          <div className='flex items-center row-start-5'>
        <Link href='https://www.instagram.com/sandro.g.h' className='' rel='noopener noreferrer' target='_blank'>
            <Image src='/img/contact/insta.svg' alt='instagram' width={62} height={62} />
        </Link>
          </div>
      </div>
    </div>
  )
}
