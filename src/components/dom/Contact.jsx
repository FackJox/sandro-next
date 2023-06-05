import Image from 'next/image'

export function Contact() {
  return (
    <div className='flex-col items-center justify-center h-full align-middle'>
      <div className='flex h-1/5'></div>

      <div className='grid grid-cols-2 grid-rows-5 place-items-center justify-items-center '>
        <div className='flex items-center col-span-2 row-start-2'>
          <p className='w-[860px]  text-center text-5xl font-bold text-syellow'>CONNECT TUNNEL RAT</p>
        </div>
        <div className='flex items-center col-span-2 row-start-3'>
          <p className='w-[827px]  text-center text-4xl text-syellow'>
            If your story involves mountains or people, I&apos;d love to help tell it.
          </p>
        </div>
        <div className='flex items-center col-span-2 row-start-4'>
          <p className='w-[860px] text-center text-4xl font-medium uppercase text-gold'>
            EMAIL: sandro.gromen-hayes@live.com
          </p>
        </div>
        <div className='flex items-center row-start-5'>
          <Image src='/img/contact/yt.jpg' alt='youtube' width={62} height={62} />
        </div>
        <div className='flex items-center row-start-5'>
          {' '}
          <Image src='/img/contact/insta.jpg' alt='instagram' width={62} height={62} />
        </div>
      </div>
    </div>
  )
}
