'use client'
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SidebarNavLinks } from '@/cosntants/contants';

const MobileNav = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <div className="relative w-[40px] z-20 h-[40px] flex flex-col justify-center items-end space-y-2 cursor-pointer" onClick={() => setIsActive(!isActive)}>
                <span className={cn("block w-full h-[2px] bg-black relative transform transition-cubic top-0 ", { 'rotate-45  top-3': isActive })}></span>
                <span className={cn("block w-[60%] h-[2px] bg-black relative transform transition-cubic top-0  ", { 'opacity-0': isActive })}></span>
                <span className={cn("block w-[20%] h-[2px] bg-black relative transform transition-cubic bottom-0", { 'rotate-[-45deg]  bottom-2 w-full': isActive })}></span>
            </div>
            <FixedNav active={isActive} setActive={setIsActive} />
        </>
    )
}

export default MobileNav

const FixedNav = ({ active,setActive }) => (
    <motion.section initial={{ y: -1000 }}
        animate={{ y: active ? 0 : -1000 }}
        transition={{ duration: 0.5, cubicBezier: 'cubicBezier(.35,.17,.3,.86)' }}
        className='fixed  z-10 w-full h-full bottom-0 left-0 bg-white'>
        <div className='flex flex-col justify-center h-full w-full items-start gap-6'>
            {
                SidebarNavLinks.map((item, index) => (
                    <Link key={index} href={item.link} onClick={()=>setActive(!active)} className='p-4 border-b-[1px] border-[#4893ff] w-[220px] font-medium text-[20px] text-main' >
                        {item.title}
                    </Link>
                ))
            }
        </div>
    </motion.section>
)