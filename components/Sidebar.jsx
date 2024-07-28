'use client'
import { SidebarNavLinks } from '@/cosntants/contants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { Button } from './ui/button'
import { AuthContext } from '@/context/authContext'

const Sidebar = () => {
  const pathName = usePathname();
  const { clearTokens ,authState } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = (item) => {
      if (item.isLogout) {
          clearTokens(); // Clear tokens from context and local storage
          console.log(authState)
          router.push('/sign-up'); // Redirect to login page
      }
  };
  return (
    <section className='sidebar'>
      <div className='flex flex-col w-full gap-10'>
        <div className='flex items-center gap-3 px-2'>
          <Image src="/assets/images/logo.svg" alt="" width={32} height={32} />
          <p className='text-[18px] font-semibold text-main'>DemandDash</p>
        </div>
        <div className='flex flex-col'>
          {
            SidebarNavLinks.map((item,index)=>{
              const isActive = pathName == item.link || pathName.startsWith(`${item.link}/`);
              return(
                <Link 
                key={index}
                onClick={() => handleClick(item)}
                className={cn('px-3 py-4 flex items-center gap-3 rounded-[10px] transition-all 0.5s ease-linear text-light',{'bg-gradient text-white ': isActive})}
                href={item.link}>
                <div className=''>
                  <Image src={item.src} width={24} height={24} alt='item.title'  className={cn({'brightness-[3] invert-0':isActive})}/>
                </div>
                {item.title}
              </Link>
              )})
          }
        </div>
        <div className='w-full flex flex-col relative h-full'>
          <div className='absolute bottom-0 right-[-8%] z-[-1px] h-full w-full'>
            <Image src='/assets/images/circlestagger.svg' fill  alt='logo'  />
          </div>
          <div className='flex flex-col bg-gradient rounded-md p-3 gap-5'>
            <div className='w-[50px] h-[50px] bg-[#4893ff] rounded-full p-[10px]'>
              <Image src="/assets/images/chatbot.png" width={24} height={24} className='brightness-[3] w-full object-contain h-auto' alt='logo' />
            </div>
            <div className=' flex flex-col gap-1 relative z-1'>
              <p className='font-medium '>Need Help?</p>
              <p className='text-[12px]'>Ask chat bot Anything</p>
              <Button variant ='secondary' className='text-light' >
                    Start a new chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sidebar