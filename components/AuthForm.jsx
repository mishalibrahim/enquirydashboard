'use client'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import Link from 'next/link'
import { loginUser, registerUser } from '@/lib/services/api'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/authContext'
import { useToast } from './ui/use-toast'

const formSchema = z.object({
    email: z.string().optional().nonempty({ message: "email is required" }),
    username: z.string().min(4).nonempty({ message: "username is required" }),
    password: z.string().min(5).nonempty({ message: "password  is required" }),
}).refine(data => {
    // If email is provided, it must be a valid email
    if (data.email && !z.string().email().safeParse(data.email).success) {
        return false;
    }
    return true;
}, {
    message: "Invalid email format",
    path: ["email"], // Path to the field that has the validation issue
})


const AuthForm = ({ type }) => {
    const {toast} = useToast();
    const { updateTokens} = useContext(AuthContext); 
    const route = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: '',
            password: "",
        },
    })
    const onSubmit = async (values) => {
        try {
            if (type === 'Sign up') {
                const response = await registerUser({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    user_role: 'admin'
                });
                console.log(response);
               if(response.status === 200){
                toast({
                    description: 'User Registered Succesfully'
                })
               }
               else{
                toast({
                    variant: "destructive",
                    description:'Uh oh! Something went wrong'
                })
               }
            } else if (type === 'Log in') {
                // Check the values being sent
                const response = await loginUser({
                    username: values.username,
                    password: values.password,
                });
                if(response.status === 200){
                    const { access_token, refresh_token } = response.data;

                    // Save tokens to local storage
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    updateTokens(access_token,refresh_token)
        
                    route.push('/'); // Redirect after login
    
                    toast({
                        description:'User Login succesfully'
                    })
                }
                // Assuming the response is in the format you provided
              
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                variant: "destructive",
                description:'Uh oh! Something went wrong'
            })
            if (error.response) {
                console.error('Error response:', error.response.data); // More detailed error response
            }
            // Handle error (e.g., show error message to user)
        }
    };
    return (
        <div className='flex justify-between items-center w-full md:pl-12  overflow-hidden gap-20 2xl:gap-[150px]'>
            <div className='w-full min-h-screen flex flex-col justify-center gap-10 px-4 flex-1'>
                <div className='flex items-start gap-3'>
                    <Image src="/assets/images/logo.svg" alt="" width={32} height={32} />
                    <p className='text-2xl text-main'>DemandDash</p>
                </div>
                <div className='flex flex-col'>
                    <h3 className='font-semi-bold text-[36px] text-main'>{type}</h3>
                    <p className='text-[14px] text-gray-500'> {type == 'Log in' ? 'Welcome back!' : ''} Please enter your details</p>
                </div>
                <div className='flex flex-col'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className='flex flex-col gap-4'>
                                {
                                    type === 'Sign up' && (
                                        <CustomInput control={form.control} name={'email'} label='Email' placeholder={'Enter your email'} />
                                    )
                                }
                                <div className='flex flex-col gap-4'>
                                    <CustomInput control={form.control} name={'username'} label='Username' placeholder={'Eg: John Doe'} />
                                    <CustomInput control={form.control} name={'password'} label='password' placeholder={'Enter your password'} />
                                </div>
                            </div>
                            <div className='flex w-full'>
                                <Button className='form-btn w-full' type="submit">{
                                    type === 'Log in' ? 'Login' : 'Sign up'
                                }</Button>
                            </div>

                            <div className='flex flex-center '>
                                <p className='text-14 font-normal text-gray-600'>{
                                    type === 'Log in' ? 'Dont have an account?' : 'Already have an account?'}
                                </p>
                                <Link className='form-link' href={type === 'Log in' ? '/sign-up' : '/sign-in'}>
                                    {type === 'Sign up' ? 'Login' : 'Sign up'}
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div className='size-full hidden md:flex relative bg-gradient flex-1 h-screen rounded-l-3xl max-h-[1400px] justify-start overflow-hidden '>
                <div className='absolute top-0 left-0 z-[-1px] h-full w-full rotate-[140deg] scale-150'>
                    <Image src='/assets/images/layer.svg' fill alt='logo' />
                </div>
                <div className='absolute bottom-0 right-0  h-full w-full rotate-[193deg] scale-150'>
                    <Image src='/assets/images/layer.svg' fill alt='logo' />
                </div>
            </div>
        </div>
    )
}

export default AuthForm