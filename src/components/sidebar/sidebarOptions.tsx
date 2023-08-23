import React, { FC } from "react";
import AddFriend from "./add-friend";
import Chats from "./chats";

interface IProps {};

const SideBarOptions:FC<IProps> = (props) => {
    return <div className="mt-6 flex flex-col">
        <AddFriend />
        <Chats />
    </div>
};

export default SideBarOptions;