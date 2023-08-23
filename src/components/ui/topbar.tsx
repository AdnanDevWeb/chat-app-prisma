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
import { cn } from "@/lib/utils";
import { UserContext } from "../../../contexts/user-context";
import Image from "next/image";



interface IProps {
    session: User
};

const TopBar:FC<IProps> = ({session}) => {

    return <div className="flex justify-between">
        <Sheet>
            <SheetTrigger className={cn("bg-secondary text-secondary-foreground hover:bg-secondary/80",   "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-2", )}>
                <span>Edit profile</span>
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