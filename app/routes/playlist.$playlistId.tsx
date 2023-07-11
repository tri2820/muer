import { MusicalNoteIcon } from "@heroicons/react/20/solid";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { z } from "zod";
import { zx } from "zodix";
import PlayButton from "~/components/PlayButton";
import PlaylistIcon from "~/components/PlaylistIcon";
import ThumbnailGrid from "~/components/ThumbnailGrid";
import CImage from "~/components/cimage";
import VideoListThumbnail from "~/components/videoListThumbnail";
import VideoThumbnail from "~/components/videoThumbnail";
import { randomFetch } from "~/utils";

export async function loader({ params }: LoaderArgs) {
    const { playlistId } = zx.parseParams(params, {
        playlistId: z.string().trim().min(1).max(256)
    });

    return json({ playlistId })

    return json({
        errors: ['Playlist not found']
    });
}


export default function PlaylistPage() {
    const loaderData = useLoaderData();
    // const { onThumbnailClick } = useOutletContext<any>()
    // const videos = loaderData?.results?.filter((x: any) => x.type == 'video')
    // const musicVideos = videos.filter()

    return <div>
        <div className="flex items-end space-x-4 p-6 pt-16 bg-indigo-700/70 bg-gradient-to-t from-black/50">
            
            <PlaylistIcon 
            className="shadow-lg shadow-black w-56 h-56" 
            isLikedSongs={true}
            iconClassName="w-24 h-24"
            />

            <div className="space-y-10">
                <div className="space-y-4">
                    <p className="text-white text-sm font-bold">Playlist</p>
                    <p className="text-white text-8xl font-extrabold">Liked Songs</p>
                </div>
                <div className="flex items-center space-x-1">
                    <MusicalNoteIcon className="w-4 h-4 text-white"/>
                    <p className="text-white text-sm font-medium">139 songs</p>
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-b from-indigo-950/60 bg-no-repeat bg-[length:auto_25vh] 
        px-6 py-6 space-y-6">
            
        <PlayButton  iconClassName="w-7 h-7 " className="p-4"/>
        
        <table className="w-full border-separate border-spacing-0 ">
  {/* <thead>
    <tr>
      <th>#</th>
      <th>Item</th>
    </tr>
  </thead> */}
  <tbody>
    
        {
            [0, 1,2,3,4,5,6,7,8,9, 10, 11].map(x => {
                return <tr className="group/row cursor-pointer transition-all duration-150">
                        <td className="pl-4 group-hover/row:bg-white/8 rounded-l-lg text-neutral-400 ">{x}</td>
                        <td className="py-4 pr-4 group-hover/row:bg-white/8 rounded-r-lg"><VideoListThumbnail/></td>
                    </tr>
              })
        }
      
  </tbody>
</table>
 
        </div>
    </div>
}