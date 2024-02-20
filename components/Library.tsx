"use client";

import { twMerge } from "tailwind-merge"
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/type";
import MediaItem from "./MediaItem";
interface LibraryProps {
    className?: string;
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user,subscription } = useUser();
    const onClick = () => {
        if (!user) {
            authModal.onOpen();
        }
        // TODO: 检查是否订阅
        // TODO: handle upload 
        uploadModal.onOpen();
    }
    return (
        <div className="
        flex flex-col
        ">
         <div className=" flex items-center justify-between px-5 pt-4">
                <div className=" inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-md font-medium text-neutral-400">Your Library</p>
                </div>
                <AiOutlinePlus onClick={onClick} size={20}  className="text-neutral-400 cursor-pointer hover:text-white transition"/>
            </div>
            <div className="
            flex flex-col gap-y-2 mt-4 px-3
            ">
                {songs.map((item) => (
                    <MediaItem 
                        onClick={() => { }}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
      </div>
    );
}

export default Library;