'use client'
import React, { useContext, useEffect, useState, Suspense } from 'react';
import EnquiryForm from '@/components/EnquiryForm';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/authContext';
import { getEnquiries } from '@/lib/services/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const EditEnquiryContent = () => {
  const { authState } = useContext(AuthContext);
  const isLoggedIn = !!authState.accessToken;
  const searchParams = useSearchParams();
  const [enquiry, setEnquiry] = useState(null);
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchEnquiry = async () => {
      if (id) {
        console.log(id, authState.accessToken);
        const response = await getEnquiries(authState.accessToken);
        const data = response.data;
        console.log({ data });
        const foundEnquiry = data.find(enquiry => enquiry.enquiry_id == id);
        console.log(foundEnquiry);
        if (foundEnquiry) {
          setEnquiry(foundEnquiry);
        }
      }
    };
    fetchEnquiry();
  }, [id, authState.accessToken]);

  return (
    <section className='pt-4 md:pt-10 md:px-[32px] px-2 flex w-full layout-height overflow-y-scroll no-scrollbar'>
      {isLoggedIn ? (
        <EnquiryForm type={'Edit'} accessToken={authState.accessToken} enquiry={enquiry} />
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
};

const EditEnquiry = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditEnquiryContent />
    </Suspense>
  );
};

export default EditEnquiry;
