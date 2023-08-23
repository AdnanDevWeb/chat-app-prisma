import React, { FC } from "react";
import { useGetFriendsRequests } from "../../../state/get-friend-req";
import FriendRequestSender from "./request-sender";

interface IProps {};

const FriendReqRecieved:FC<IProps> = (props) => {


    const {data: friendRequestsSenders, isLoading} = useGetFriendsRequests()
    return <ul className="flex flex-col gap-4 py-2">


        {
            isLoading &&
            <p>Loading requests</p>
        }
        <p className="text-sm text-gray-300">Friend requests recieved</p>
        {
            friendRequestsSenders ?
            friendRequestsSenders?.map(sender => {
                return <FriendRequestSender sender={sender} />
            })

            : null
        }
    </ul>
};

export default FriendReqRecieved;