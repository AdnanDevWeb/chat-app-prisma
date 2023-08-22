"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import { Input } from "./input"
import { toast } from "./use-toast"
import { useContext } from "react"
import { UserContext } from "../../../contexts/user-context"
import Image from "next/image"


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().min(5, {
    message: "Come on bro, type more ! Express your self !!!"
  }),
  /* image: z.any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
  ) */
  image: z.string().url({
    message: 'Pass a valid url format'
  }),
})

export default function SheetForm() {
    const {user} = useContext(UserContext)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    try {
      const res = await axios.post('/api/updateCurrentUser', {
        name: data.name,
        bio: data.bio,
        image: data.image
      })
      console.log('Response:' , res.data)
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="name"
              defaultValue={user?.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              defaultValue={(user?.bio) as string}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input placeholder="My awesome bio" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write a nice bio !
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              defaultValue={(user?.image) as string}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile picture</FormLabel>
                  <FormControl>
                    <Input placeholder="Link to the image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        <p>Preview:</p>
        <Image 
        src={(user?.image) as string}
        alt="You profile pic"
        width={40}
        height={40}
        className="rounded-full"
        />        
    </>
  )
}
