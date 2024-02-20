"use client";

import useLoadingImage from "@/hooks/useLoadingImage";
import { Song } from "@/type";
import Image from "next/image";
import PlayButton from "./PlayButton";
interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    const imagePath = useLoadingImage(data);
    return (
        <div
            onClick={onClick(data.id)}
            className=" 
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3"
        >
            <div
            className="relative w-full h-full rounded-md overflow-hidden aspect-square"
            >
                <Image className="" src={imagePath ?? '/images/liked.png'} fill alt="Image"/>
           </div>
            <div className="flex flex-col items-start w-full pt-4 gap--y-4 pl-1">
                <p className="font-semibold truncate w-full  text-lg">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm pb-4w-full truncate">
                 By {data.author}  
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                {/* <PlayButton/> */}
                <PlayButton />
            </div>
        </div>
    )
}

export default SongItem;