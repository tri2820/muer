import { MusicalNoteIcon, PlayIcon } from "@heroicons/react/20/solid";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useAtom } from "jotai";
import { z } from "zod";
import { zx } from "zodix";
import { playlistsAtom } from "~/atoms";
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
    const [playlists, setPlaylists] = useAtom(playlistsAtom);
    // use Atom
    const playlist = playlists.find(x => x.id == loaderData.playlistId) 
    const { onThumbnailClick } = useOutletContext<any>()
    // const videos = loaderData?.results?.filter((x: any) => x.type == 'video')
    // const musicVideos = videos.filter()
    const isHearted = playlist?.type == 'hearted'

    if (!playlist) return <div>
        <p className="text-red-500">Cannot find this playlist</p>
    </div>

    return <div className="@container/playlist">
        <div className="flex items-end space-x-4 p-6 pt-16 bg-indigo-700/70 bg-gradient-to-t from-black/50">
            
            
            <PlaylistIcon 
            className="shadow-lg shadow-black hidden @xl/playlist:flex h-56 w-56" 
            isHearted={isHearted}
            iconClassName="w-24 h-24"
            />
            

            <div className="@xl/playlist:space-y-10 space-y-2">
                <div className="space-y-4">
                    <p className="text-white text-sm font-bold">Playlist</p>
                    <p className="text-white text-3xl font-extrabold @xl/playlist:text-8xl line-clamp-1">{playlist.name}</p>
                </div>
                <div className="flex items-center space-x-1">
                    <MusicalNoteIcon className="w-4 h-4 text-white"/>
                    <p className="text-white text-sm font-medium">{playlist.videos.length} songs</p>
                </div>
            </div>
        </div>

        { 
            playlist.videos.length > 0 && 
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
        playlist.videos.map((x, i) => {
            return <tr 
            onClick={() => {
                onThumbnailClick({
                    videoId: x.id,
                    thumbnailUrl: x.thumbnailUrl,
                    title: x.title,
                    author: x.author
                })
            }}
            key={x.id} className="group/row cursor-pointer transition-all duration-150 ">
                <td className="w-8 @xl/playlist:w-16 pl-2 @xl/playlist:pl-6 group-hover/row:bg-white/8 rounded-l-lg text-neutral-400">
                    <span className="group-hover/row:hidden text-sm @xl/playlist:text-base line-clamp-1">{i}</span>
                    <span className="hidden group-hover/row:block text-white">{
                        <PlayIcon className="w-4 h-4"/>
                    }</span>
                </td>
                <td className="py-3 pr-2 @xl/playlist:px-3 @xl/playlist:pr-6 group-hover/row:bg-white/8 rounded-r-lg"><VideoListThumbnail video={x}/></td>
            </tr>

        })
    }
      
  </tbody>
</table>
 
        </div>
        }
    </div>
}