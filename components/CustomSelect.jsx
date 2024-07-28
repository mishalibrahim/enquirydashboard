import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";

const CustomSelect = ({ control, name, label, placeholder ,data }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='flex flex-col gap-1.5 w-full h-full'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full p text-[12px] h-[44px] placeholder:text-gray-500" >
                                <SelectValue placeholder={placeholder} className="placeholder:text-12 placeholder:text-gray-500 "/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    data.map((item,index)=>(
                                        <SelectItem className='text-[12px]' key={index} value={item.value}>{item.title}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage className='form-message' />
                </div>
            )}
        />
    );
};

export default CustomSelect;
