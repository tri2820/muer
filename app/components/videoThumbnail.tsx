import { PlayIcon } from "@heroicons/react/20/solid";
import CImage from "./cimage";
import PlayButton from "./PlayButton";


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

            <div className="absolute bottom-2 right-2">
                <PlayButton 
                className='p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300'
                iconClassName='w-6 h-6'
                />
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

