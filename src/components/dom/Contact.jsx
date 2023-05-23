import Image from 'next/image'

export function Contact() {
  return (
    <div className='h-full flex-col items-center justify-center align-middle'>
      <div className='flex h-1/5'>Test</div>

      <div className='grid grid-cols-2 grid-rows-5 place-items-center justify-items-center '>
        <div className='col-span-2 row-start-2 flex items-center'>
          <p className='w-[860px]  text-center text-5xl font-bold text-syellow'>CONNECT TUNNEL RAT</p>
        </div>
        <div className='col-span-2 row-start-3 flex items-center'>
          <p className='w-[827px]  text-center text-4xl text-syellow'>
            If your story involves mountains or people, I&apos;d love to help tell it.
          </p>
        </div>
        <div className='col-span-2 row-start-4 flex items-center'>
          <p className='w-[860px] text-center text-4xl font-medium uppercase text-gold'>
            EMAIL: sandro.gromen-hayes@live.com
          </p>
        </div>
        <div className='row-start-5 flex items-center'>
          <Image src='/img/contact/yt.jpg' alt='youtube' width={62} height={62} />
        </div>
        <div className='row-start-5 flex items-center'>
          {' '}
          <Image src='/img/contact/insta.jpg' alt='instagram' width={62} height={62} />
        </div>
      </div>
    </div>
  )
}
