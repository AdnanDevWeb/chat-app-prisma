"use client"
import { User } from "@prisma/client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "../ui/use-toast";

interface IProps {
    sender: User
};

const FriendRequestSender:FC<IProps> = ({sender}) => {

    const acceptRequest = async () => {

        try {
            await axios.post('/api/acceptfriend', {
                senderId: sender.id
            })
            toast({
                title: 'You have a new friend now !! 🎉'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const denyRequest = async () => {
        
    }
    return <li className="p-2 bg-slate-800 rounded-md flex justify-between items-center">

        <div className="flex gap-2 items-center">
            <Image
            src={sender.image}
            width={40}
            height={40}
            alt={`${sender.name}'s name`}
            className="rounded-full"
            />
            <p>{sender.name}</p>
        </div>
        <div className="flex gap-3">
            <UserPlus
            className="hover:cursor-pointer"
            onClick={acceptRequest}
            />
            <UserMinus
            className="hover:cursor-pointer"
            onClick={denyRequest}
            />
        </div>
    </li>
};

export default FriendRequestSender;