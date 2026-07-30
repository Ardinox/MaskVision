import Image from 'next/image'
import Link from 'next/link'
import Icon from '../../public/HeroIcon.png'
import { Button } from './ui/button'

const HeroSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[calc(100vh-8rem)] flex items-center">
      <div className='flex flex-col-reverse lg:flex-row items-center justify-between gap-10'>
        <div className="flex-1 max-w-2xl flex flex-col justify-center">
          <span className="inline-block w-fit rounded-full bg-blue-100 dark:bg-zinc-800 px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 transition-transform duration-300 hover:scale-105">
            AI-Powered Privacy Protection
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            MASKVISION
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-700 dark:text-zinc-300">
            <span className='text-blue-600 dark:text-blue-400'>Protect Sensitive</span> Documents in Seconds.
          </h2>
          <p className="mt-8 max-w-xl text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Upload images or videos and automatically mask <span className='text-indigo-600 dark:text-indigo-400'
            >Aadhaar</span>, <span className='text-blue-600 dark:text-blue-400'>PAN</span> and <span className='text-cyan-600 dark:text-cyan-400'>QR Codes
            </span>.
          </p>
          <div className='flex flex-wrap gap-4 mt-10'>
            <Link href="/about">
              <Button className="bg-amber-400 px-8 py-6 text-md transition-transform duration-200 hover:scale-105 hover:bg-orange-300"
              >Learn More
              </Button>
            </Link>

            <Link href="/services">
              <Button className="bg-green-500 px-8 py-6 text-md transition-transform duration-200 hover:scale-105 hover:bg-emerald-300"
              >Start Masking
              </Button>
            </Link>

          </div>
        </div>
        <div className='px-6 lg:px-12 hidden lg:block'>
          <Image
            src={Icon}
            alt="Home Page Icon"
            loading="eager"
            className="w-64 lg:w-96 h-auto transition-transform duration-300 hover:scale-105"
          >
          </Image>
        </div>
      </div>
    </div>

  )
}

export default HeroSection