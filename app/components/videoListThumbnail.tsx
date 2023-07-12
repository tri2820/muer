import CImage from "./cimage";

export default function VideoListThumbnail({video}: any){
    return <div className="flex items-center space-x-4">
            
          <CImage
              className="object-cover aspect-video w-32 rounded shadow-lg shadow-neutral-900/50"
              src={video.thumbnailUrl}
              widthLargerThan={960}
              heightLargerThan={640}
          />

          <div className="space-y-2">
              <p className="text-white font-medium line-clamp-1">{video.title}</p>
              <p className=" text-neutral-400 font-medium line-clamp-1">{video.author}</p>
          </div>
          </div>

}