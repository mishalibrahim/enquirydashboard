'use client'
import EnquiryTable from '@/components/Table'
import { AuthContext } from '@/context/authContext';
import { getEnquiries } from '@/lib/services/api';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const ViewEnquiry = () => {
  const { authState } = useContext(AuthContext);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headers,setHeaders] = useState([])
  const router =useRouter();
  useEffect(()=>{
    const fetchAllEnquiries = async () =>{
      try {
        console.log(authState.accessToken);
        if(authState.accessToken){
          const response = await getEnquiries(authState.accessToken);
          const data =response.data;
          setEnquiries(data);

          if (data.length > 0) {
            setHeaders(Object.keys(data[0]));
          }
        }
        else
        {
          setError('no access token found')
        }
      } catch (error) {
        console.error('Error fetching enquiries:', err);
        setError('Failed to fetch enquiries');
      }
    }
    fetchAllEnquiries();
  },[authState.accessToken])
  return (
    <section className='pt-4 md:pt-10 md:px-[32px] px-2 flex w-full  layout-height overflow-y-scroll no-scrollbar'>
        <div className='flex flex-col gap-6 size-full '>
            <div className='flex flex-col gap-1'>
                <h1 className='text-main md:text-[36px] text-[22px] font-semibold'>View Enquiries</h1>
                <p className='text-gray-500 md:text-[16px] text-[12px]'>Track all Enquiries here</p>
            </div>
            <EnquiryTable data={enquiries} header={headers} token={authState.accessToken}/>
        </div>
    </section>
  )
}

export default ViewEnquiry