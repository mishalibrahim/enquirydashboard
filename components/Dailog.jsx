import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import Image from "next/image"
import { deleteEnquiry } from "@/lib/services/api"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"


const Dailog = ({item,token}) => {
    const {toast} = useToast();
    const router = useRouter()
    const handleDelete = async() =>{
     try{
        if(item.enquiry_id && token){
            const id =item.enquiry_id;
            const response = await deleteEnquiry(token,id)
            if(response.status === 200){
                toast({
                    description:'enquiry deleted succcesfully'
                })
            router.reload();
            }
        }
       
     }
     catch(error)
     {
        console.log(error);
     }
        
        
    }
  return (
    <Dialog className='w-full ' >
    <DialogTrigger className="bg-red-500 rounded-[100%] w-[40px] h-[40px] flex justify-center items-center  ">
        <Image src='/assets/images/delete.png' width={30} height={30} alt='delete' className="px-1"/>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure to Delete this enquiry?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your enquiry
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" >
              Close
            </Button>
          </DialogClose>
          <DialogTrigger asChild>
          <Button type="submit" variant="destructive"
            onClick={() => handleDelete()} >
              Delete
            </Button>
            </DialogTrigger>
        </DialogFooter>
    </DialogContent>
  </Dialog>
  
  )
}

export default Dailog