import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
const CustomInput = ({ control, name, label, placeholder }) => {
    
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='flex flex-col gap-1.5 w-full'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <FormControl>
                        <Input className='input-class min-h-[44px] outline-none shadow-none focus:outline-none'
                         type={name === 'password'? 'password' : 'text'}
                          placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage className='form-message'/>
                </div>
            )
        }
        />
    )
}

export default CustomInput