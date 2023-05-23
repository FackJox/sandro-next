const AboutSecond = ({ isClicked, handleClick }) => {
  const gridVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
  }

  const control = useAnimation()

  useEffect(() => {
    if (isClicked) {
      control.start('animate')
    } else {
      control.start('initial')
    }
  }, [control, isClicked])

  return (
    <div
      onClick={handleClick}
      className='flex-col items-center justify-center h-full text-2xl text-left text-white align-middle font-Poppins'
    >
      <div className='flex h-1/6'>test</div>
      <motion.div
        className='grid h-full grid-cols-3 pb-32 align-middle grid-rows-8'
        initial='initial'
        animate={control}
        exit='exit'
        variants={gridVariants}
      >
        <div className='flex items-center justify-center col-span-3'>HIGH ALTITUDES TUNNEL RAT</div>
        <div className='flex items-center col-span-2 col-start-2 row-start-5 pl-40'>
          <p className='w-[530px] h-[108px] text-xl text-left text-white font-Poppins'>
            In between I worked on Netflix's '14 Peaks' as a high altitude DP and produced climbing content for Red Bull
            TV, Epic TV, Montane, Berghaus and Osprey.
          </p>{' '}
        </div>
        <div className='flex items-center justify-center col-start-2 row-start-2'>
          <svg
            width={4}
            height={49}
            viewBox='0 0 4 49'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className=''
            preserveAspectRatio='none'
          >
            <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
          </svg>
        </div>
        <div className='flex items-end justify-end col-span-2 col-start-1 row-start-3 pr-40 '>
          <p className='items-end justify-end flex w-[530px] h-[108px] text-xl text-left text-white font-Poppins'>
            In 2018 I filmed the first Afghan woman as she summited Noshaq, the countries highest peak. In 2022 I flew a
            drone over K2 as the first Pakistani woman reached the top.
          </p>{' '}
        </div>
        <div className='flex items-center justify-center col-start-2 row-start-4'>
          <svg
            width={4}
            height={49}
            viewBox='0 0 4 49'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='flex'
            preserveAspectRatio='none'
          >
            <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
          </svg>
        </div>
        <div className='flex items-center justify-center col-start-2 row-start-6'>
          <svg
            width={4}
            height={49}
            viewBox='0 0 4 49'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='flex  pt-[-64px] '
            preserveAspectRatio='none'
          >
            <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
          </svg>
        </div>
        <div className='col-start-1 row-span-3 row-start-4 pl-24'>
          <img src='/img/about/drone.jpg' className='w-[200px] h-[246px] rounded-[536px] object-cover' />
        </div>
      </motion.div>
    </div>
  )
}
