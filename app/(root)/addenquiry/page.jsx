'use client'
import EnquiryForm from '@/components/EnquiryForm'
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/authContext';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react'

const AddEnquiry = () => {
  const { authState} = useContext(AuthContext);
  const isLoggedIn = !!authState.accessToken;

  useEffect(() => {
    
  }, [authState.accessToken]);

  return (
    <section className='pt-4 md:pt-10 md:px-[32px] px-2 flex w-full layout-height overflow-y-scroll no-scrollbar'>
    {isLoggedIn ? (
      <EnquiryForm type={'Add'} accessToken ={authState.accessToken}/>
    ) : (
      <div className='flex flex-col gap-1.5'>
      <p>You must be logged in to add an enquiry.</p>
      <Button asChild>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
      </div>
    )}
  </section>
);

}

export default AddEnquiry   