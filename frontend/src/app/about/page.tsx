import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { technologies } from '@/lib/techList'
import WorkflowSection from '@/components/WorkflowSection'
import ComparisonSection from '@/components/ComparisionSection'

import MaskedImage from "../../../public/MaskedImage.png"
import OriginalImage from "../../../public/OriginalImage.png"
import MaskedGif from "../../../public/MaskedGif.gif"
import OriginalGif from "../../../public/OriginalGif.gif"


const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 py-20">
      <div className='flex flex-col gap-16'>
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-relaxed">What is MaskVision?</h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">MaskVision is an AI-powered privacy protection tool that automatically detects and masks sensitive information such as Aadhaar numbers, PAN numbers, and QR codes from images and videos. It combines OCR, computer vision, and intelligent tracking to provide fast and reliable privacy protection while preserving the readability of the remaining document.</p>
        </div>

        <WorkflowSection />

        {/*Demo Section For Images and Videos*/}
        
        <ComparisonSection
          title="Image Demo"
          description="Aadhaar number, PAN number and QR code were automatically detected and blurred."
          beforeSrc={OriginalImage}
          afterSrc={MaskedImage}
        />

        <ComparisonSection
          title="Video Demo"
          description="Frame skipping and OpenCV tracking speed up processing while maintaining masking quality."
          beforeSrc={OriginalGif}
          afterSrc={MaskedGif}
        />

        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Technologies</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {technologies.map(({ name, icon: Icon, className }) => (
              <div
                key={name}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${className}`}
              >
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </div>
            ))}
          </div>

        </div>
        <div className="flex justify-center  pt-8">
          <Link href="/services">
            <Button className="bg-green-500 px-8 py-6 text-md transition-transform duration-200 hover:scale-105 hover:bg-emerald-300"
            >Start Masking
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page