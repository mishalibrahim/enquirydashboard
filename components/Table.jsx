'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Dailog from "./Dailog"


const EnquiryTable = ({data,header,token}) => {
    const route = useRouter();
    
    const handleEdit=(item)=>{
        const id =item.enquiry_id;
        route.push(`/editEnquiry?id=${id}`);
    }
 
    return (
        <Table className='size-full relative z-0'>
            <TableHeader className='relative z-1' >
                <TableRow className='sticky top-0 bg-gradient'>
                    {
                        header.map((item,index)=>(
                            <TableHead key={index} className="w-[100px] font-semibold text-white ">{item}</TableHead>
                        ))
                        
                    }
                    <TableHead className="w-[100px] font-semibold text-white sticky right-0 bg-gray-400 ">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {
                          data.map((item, index) => (
                            <TableRow key={index} className='relative z-[-1]' >
                              {header.map((header) => (
                                <TableCell key={header}>{item[header]}</TableCell>
                              ))}
                              <TableCell className='sticky right-0 bg-gray-100 px-2 py-2'>
                                <div className="flex gap-1.5">
                                    <Button variant='ghost' className='px-[10px] bg-gradient flex-1  w-[40px] rounded-[100%] h-[40px] flex justify-center items-center'
                                    onClick={()=>handleEdit(item)}
                                        >
                                        <Image src='/assets/images/editenq.png' width={30} height={30} alt={'edit'} />
                                    </Button>
                                    <Dailog item={item} token={token}/>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                    }
            </TableBody>
        </Table>

    )
}

export default EnquiryTable