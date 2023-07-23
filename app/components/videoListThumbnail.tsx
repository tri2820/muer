import { Video } from "~/atoms";
import CImage from "./cimage";
import { t } from "~/utils";

export default function VideoListThumbnail(props: any){
    const {video, active = false} = props;
    
    return <div className="flex items-center space-x-4">
            
          <CImage
              className="
              hidden
              @xl/playlist:block
              object-cover aspect-video w-32 rounded shadow-lg shadow-neutral-900/50"
              src={video.thumbnailUrl}
              widthLargerThan={960}
              heightLargerThan={640}
          />

          <div className="space-y-2">
              <p className={'font-medium line-clamp-1' + t(active, 'text-green-500', 'text-white')}>{video.title}</p>
              <p className=" text-neutral-400 font-medium line-clamp-1">{video.author}</p>
          </div>
          </div>

}