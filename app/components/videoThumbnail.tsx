import { PlayIcon } from "@heroicons/react/20/solid";
import CImage from "./cimage";


function VideoThumbnail({ url, title, author, videoId, onThumbnailClick }: any) {
    return <div
        className="w-full p-4 bg-white/2 hover:bg-white/8 rounded transition-all duration-150
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
                className="object-cover aspect-video w-full rounded shadow-lg shadow-neutral-900/50"
                src={url}
                widthLargerThan={960}
                heightLargerThan={640}
            />

            <div className="
                absolute
                hover:scale-105
                bottom-2 right-2
                ">
                <button className="p-3 
                    translate-y-2 opacity-0 
                    bg-green-500 
                    hover:bg-green-400 
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-300
                    rounded-full
                    shadow-lg shadow-neutral-900/50
                ">
                    <PlayIcon className="w-6 h-6 text-black" />
                </button>
            </div>
        </div>

        <div className="pt-4 pb-2">
            <p className="text-sm font-semibold text-white line-clamp-2">{title}</p>
        </div>

        <p className="text-sm text-neutral-400 line-clamp-1">{
            author
        }</p>



    </div>
}


export default VideoThumbnail;

