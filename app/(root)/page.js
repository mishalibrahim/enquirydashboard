'use client'
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";


export default function Home() {
  const { authState } = useContext(AuthContext);
  const isLoggedIn = !!authState?.accessToken;
  const router =useRouter()
  useEffect(()=>{

      if(isLoggedIn){
        console.log('logged in succesfully')
      }
  },[authState.accessToken])
  return (
   <section className="pt-4 md:pt-10 md:px-[32px] px-2 flex w-full layout-height overflow-y-scroll no-scrollbar">
    {
      isLoggedIn ? ( 
        <div className="flex flex-col gap-6 size-full ">
        <div className="flex flex-col">
          <h2 className="font-semibold md:text-[34px] text-[22px]">Dashboard</h2>
          <p className='text-gray-600 md:text-14 text-[10px]'>Welcome to Your Dashboard: Manage Your Projects and Track Progress</p>
        </div>
        <div className="grid lg:grid-cols-2 w-full  gap-6">
          <div className="shadow-md w-full rounded-lg p-5">
            <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-[16px] text-main"> DemandDash</p>
                      <p className="text-gray-500 text-[12px]">Effortlessly Manage and Monitor Enquiries</p>
                    </div>
                    <div className="flex w-full align-bottom">
                      <Button asChild className='bg-gradient'>
                        <Link href='/addenquiry'>Add Enquiry</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient w-[200px] h-[200px] rounded-lg relative flex justify-center items-center">
                  <div className='absolute bottom-0 right-[-8%] z-[-1px] h-full w-full'>
                    <Image src='/assets/images/circlestagger.svg' fill  alt='logo' />
                  </div>
                  <p className="text-white font-medium">DemandDash</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      ):(
        <div className='flex flex-col gap-1.5'>
        <p>You must be logged in to add an enquiry.</p>
        <Button asChild>
          <Link href='/sign-in'>Sign in</Link>
        </Button>
        </div>
      )
    }
  
   </section>
  );
}
