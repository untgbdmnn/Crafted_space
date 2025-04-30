"use client"

import BannerImage from '@/assets/background-gradient-lights.jpg'
import Image from 'next/image'

interface Props {
  children: React.ReactNode
}
export default function layout({ children }: Props) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-5/6 min-h-5/6 border p-3 rounded-sm bg-foreground text-background shadow lg:grid lg:grid-cols-9 flex flex-col gap-x-2">
        <div className="col-span-4 w-full h-full flex items-center justify-center">{children}</div>
        <div className='w-full h-full relative col-span-5 rounded-sm'>
          <Image src={BannerImage} alt='Banner Image' layout='fill' objectFit='cover' className='rounded-sm'/>
        </div>
      </div>
    </div>
  )
}
