"use client"


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
import Image from "next/image"
import { UploadButton } from "@/lib/uploadthing"
import { Label } from "./label"
import { useUser } from "../../../state/user-state"
import { useState } from "react"

export default function SheetForm() {
/*     const {user} = useContext(UserContext)
 */

    const { data: user, isLoading } = useUser()

    const [usernameValue, setUsernameValue] = useState(user?.name)
    const [bioValue, setBioValue] = useState(user?.bio || 'My awesome bio')
    const [uploadImgUrl, setUploadedImgUrl] = useState(user?.image)

    const onFormSubmit = async (e) => {
      e.preventDefault()

      try {
        const reqBody = {
          usernameValue,
          bioValue,
          uploadImgUrl,
        }

        await axios.post('/api/updateCurrentUser', {
          name: usernameValue,
          bio: bioValue,
          image: uploadImgUrl
        })

        toast({
          title: 'You submitted these values:',
          description: <code>
             <pre className="p-[10px] overflow-x-auto whitespace-pre-wrap block">{JSON.stringify(reqBody, null, 2)}</pre>
          </code>
        })
      } catch (error) {
        console.log(error);
      }

    }

  return (
    <>
      <form onSubmit={(e)=> onFormSubmit(e)} action="" className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input value={usernameValue} onChange={({target}) => setUsernameValue(target.value)} name="username" id="username" placeholder="You username" />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="bio">Bio</Label>
          <Input
          value={bioValue}
          onChange={({target}) => setBioValue(target.value)}
           name="bio" id="bio" placeholder="Your awesome bio" />
        </div>

        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setUploadedImgUrl(res![0].url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.

        }}
        />


        <Button type="submit">Submit</Button>
      </form>
        <p>Preview:</p>
       <Image 
        src={( (user?.image) as string )}
        alt="You profile pic"
        width={40}
        height={40}
        className="rounded-full"
        />

        {user?.image}
    </>
  )
}
