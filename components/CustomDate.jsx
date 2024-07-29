"use client"

import React, { useState } from "react"
// import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import Image from "next/image"

export function CustomDate({ control, name, label, placeholder}) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='flex flex-col gap-1.5 w-full'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full h-[44px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                                    <Image src='/assets/images/calendar.png' width={24} height={24} className="mr-2" alt="calendericon"/>
                                  {field.value ? 
                                        (field.value instanceof Date && !isNaN(field.value.getTime()) 
                                            ? format(field.value, "PPP") 
                                            : <span>{placeholder}</span>) 
                                        : <span>{placeholder}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => field.onChange(date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage className='form-message' />
                </div>
            )}
        />

    )
}
