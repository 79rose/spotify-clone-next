"use client";

import useLoadingImage from "@/hooks/useLoadingImage";
import { Song } from "@/type";
import Image from "next/image";
interface MidiaItemProps {
    data: Song;
    onClick?: (id: string) => void;
    
}

const MediaItem: React.FC<MidiaItemProps> = ({ data, onClick }) => {
  
    const imagrUrl = useLoadingImage(data);
    const handleClick = () => {
        if (onClick) {
            onClick(data.id);
        }
        // TODO: 默认播放
    }

    return (
        <div
            onClick={handleClick}
            className="
            flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md
            "
        >
            <div
                className="
                relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden
                "
            >
                <Image
                    fill 
                    src={imagrUrl ?? '/images/liked.jpg'}
                    alt="media"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate"> 
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;