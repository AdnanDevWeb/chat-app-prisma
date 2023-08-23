
"use client"
import React, { FC, useState } from "react";
import { Button } from "../ui/button";
import { Send, UserPlus } from "lucide-react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ZodError, z } from "zod";
import { toast } from "../ui/use-toast";
import axios, { AxiosError } from "axios";
import FriendReqRecieved from "./FriendReqRecived";
interface IProps {};

const AddFriend:FC<IProps> = (props) => {

  const [emailToAdd, setEmailToAdd] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const email = z.string().email().parse(emailToAdd)
      await axios.post('/api/sendrequest', {
        emailToAdd,
      })
      toast({
        title: 'Request send successfully'
      })
    }catch(error){
      if (axios.isAxiosError(error)) {
        // Axios error with response
        if (error.response) {
          console.log('Server Error Status:', error.response.status);
          console.log('Server Error Data:', error.response.data);
          return toast({
            title: error.response.data,
            variant: 'destructive'
          });
        }
        // Axios error without response
        console.log('Axios Request Error:', error.message);
        return toast({
          title: 'Request error occurred',
          variant: 'destructive'
        });
      } else {
        // Other error types

        const otherErr = error as Error
        console.log('Error:', otherErr.message);
        return toast({
          title: 'Unknown error occurred',
          variant: 'destructive'
        });
      }
    }
  }

    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-4">
              <UserPlus/>
              Add a new friend
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="items-center flex gap-3 ">
                  <UserPlus />
                  Add friend
              </DialogTitle>
              <DialogDescription>
                  Send request to a user by providing his email ! A new chat will apear once the user accepted the request
              </DialogDescription>
            </DialogHeader>
            <form onClick={(e) => handleFormSubmit(e)} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  E-mail
                </Label>
                {emailToAdd}
                <Input value={emailToAdd} onChange={({target}) => setEmailToAdd(target.value)} required id="email" placeholder="myfriend@mail.com" className="col-span-3" />
              </div>
            <DialogFooter className="pt-2">
              <Button type="submit" className="flex gap-3 items-center">
                  <Send/>
                  Send request
              </Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="pt-6 pb-2">
          <FriendReqRecieved />
        </div>
      </>
    )
};

export default AddFriend;