import { PlayIcon } from "@heroicons/react/20/solid";
import CImage from "./cimage";


function VideoThumbnail({ url, title, author, videoId, onThumbnailClick }: any) {
    return <div
        className="w-full p-4 bg-white/5 hover:bg-white/10 rounded transition-all duration-150
      cursor-pointer
      group
      "
        onClick={() => {
            onThumbnailClick({
                videoId,
                thumbnailUrl: url,
                title,
                author
            })
        }}
    >
        <div className="relative">
            <CImage
                className="object-cover aspect-square w-full rounded"
                src={url}
            />

            <div className="
                absolute
                hover:scale-105
                bottom-2 right-2
                drop-shadow-2xl 
                ">
                <button className="p-3 
                    translate-y-2 opacity-0 
                    bg-green-500 
                    hover:bg-green-400 
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-300
                    rounded-full
                ">
                    <PlayIcon className="w-6 h-6 text-black" />
                </button>
            </div>
        </div>

        <div className="pt-4 pb-2">
            <p className="text-sm font-semibold text-white line-clamp-2">{title}</p>
        </div>

        <p className="text-xs text-neutral-400 line-clamp-1">{
            author
        }</p>



    </div>
}


export default VideoThumbnail;

