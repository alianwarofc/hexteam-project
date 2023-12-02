import React from 'react'
import Image from 'next/image'


export const AuthLayout = ({children}) => {
  return (
    <main className=' w-full grid lg:grid-cols-2'>
      <div className="hidden lg:block items-center pt-10 pb-10 bg-zinc-100 ">
      
          <section className=" flex justify-center relative items-centerw-[640px]">
        <Image 
        src="/banner.jpg"
        width={500}
        height={120}
        alt=""
        />

        </section>
          
          
        
      
        </div>
      <div className='flex justify-center items-center'>
        <div>{children}</div>
      </div>
      
    </main>
  )
}
