"use client"
import { User } from "@prisma/client";
import React, { FC, useContext } from "react";
import { Button } from "./button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ModeToggle } from "./theme-handler";
import { signOut } from "next-auth/react";
import SheetForm from "./sheet-form";
  



interface IProps {
    session: User
};

const TopBar:FC<IProps> = ({session}) => {
    return <div className="p-3 flex justify-between">
        <Sheet>
            <SheetTrigger>
                <Button variant={"secondary"}>Edit profile</Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Edit your profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>


                {/* Sheet form */}
                <SheetForm />


                <div className="flex flex-col gap-2 align-self-end mt-auto">
                    <Button variant={"outline"} onClick={()=> signOut()}>Log out</Button>
                </div>
            </SheetContent>
        </Sheet>
        <ModeToggle />
    </div>
};

export default TopBar;