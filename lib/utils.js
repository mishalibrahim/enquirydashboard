import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const authFormSchema =(type) => z.object({
  // sign-up
  firstName : type === 'sign-in' ?z.string().optional() : z.string().min(3),
  lastName : type === 'sign-in' ?z.string().optional() : z.string().min(3),
  address1 : type === 'sign-in' ?z.string().optional() : z.string().max(50),
  city : type === 'sign-in' ?z.string().optional() : z.string().max(50),
  state : type === 'sign-in' ?z.string().optional() : z.string().min(2).max(2),
  postalCode: type === 'sign-in' ?z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === 'sign-in' ?z.string().optional() : z.string().min(3),
  ssn: type === 'sign-in' ?z.string().optional() : z.string().min(3),
  // both-in
  email: z.string().email(),
  password : z.string().min(8),
})