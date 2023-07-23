import { MusicalNoteIcon, PlayIcon } from "@heroicons/react/20/solid";
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useAtom } from "jotai";
import { z } from "zod";
import { zx } from "zodix";
import { Video, playlistsAtom } from "~/atoms";
import PlayButton from "~/components/PlayButton";
import PlaylistIcon from "~/components/PlaylistIcon";
import ThumbnailGrid from "~/components/ThumbnailGrid";
import CImage from "~/components/cimage";
import VideoListThumbnail from "~/components/videoListThumbnail";
import VideoThumbnail from "~/components/videoThumbnail";
import { randomFetch } from "~/utils";
import Lottie from "lottie-react";
import spectrumAnimation from "../../public/spectrum.json";


export default function RadioPage() {
    const { onThumbnailClick, playingVideoData } = useOutletContext<any>()
    const thumbnailUrl = playingVideoData?.videoThumbnails?.find((x: any) => x.quality == 'maxresdefault')?.url
    || playingVideoData?.videoThumbnails?.at(0)?.url;
    const currentPosition = playingVideoData?.recommendedVideos.findIndex((x: any) => x.videoId == playingVideoData.videoId) ?? 0;
    const upcomingVideos = playingVideoData?.recommendedVideos.slice(currentPosition + 1)

    return <div className="p-6 pt-16">
            
        <p className="font-bold text-2xl text-white my-6">Radio</p>
        
        {
            upcomingVideos ? <div className="space-y-8">
            <div className="space-y-2">
               <p className="font-semibold text-neutral-400 line-clamp-1">Now playing</p>
               <table className="w-full border-separate border-spacing-0 ">
            <tbody>
        
                <tr 
                       
                        onClick={() => {
                            onThumbnailClick({
                                videoId: playingVideoData.videoId,
                                title: playingVideoData.title,
                                author: playingVideoData.author,
                                thumbnailUrl
                            })
                        }}
                        className="group/row cursor-pointer transition-all duration-150 ">
                                        <td className="w-16 pl-6 group-hover/row:bg-white/8 rounded-l-lg text-green-500">
                                            <span className="group-hover/row:hidden">
                                            <Lottie
                                            // lottieRef={lottieRef}
                                            autoplay={true}
                                            loop={true}
                                            animationData={spectrumAnimation}
                                            className='w-4 h-4' />
                                            </span>
                                            <span className="hidden group-hover/row:block text-white">{
                                                <PlayIcon className="w-4 h-4"/>
                                            }</span>
                                        </td>
                                        <td className="p-3 pr-6 group-hover/row:bg-white/8 rounded-r-lg"><VideoListThumbnail 
                                        active
                                        video={{
                                            id: playingVideoData.videoId,
                                            title: playingVideoData.title,
                                            author: playingVideoData.author,
                                            thumbnailUrl
                                        }}/>
                                        </td>            
                        </tr>

                    
            </tbody>
        </table>
        </div>
        <div className="space-y-2">
            <p className="font-semibold text-neutral-400 line-clamp-1">Coming up</p>
            <table className="w-full border-separate border-spacing-0 ">
            <tbody>
        
                {
                    upcomingVideos

                    .map((x: any, i: number) => {
                        const thumbnailUrl = x.videoThumbnails.find((x: any) => x.quality == 'maxresdefault').url
                        const video : Video = {
                            id: x.videoId,
                            title: x.title,
                            author: x.author,
                            thumbnailUrl
                        }

                        return <tr 
                        key={x.videoId}
                        onClick={() => {
                            onThumbnailClick({
                                videoId: x.videoId,
                                title: x.title,
                                author: x.author,
                                thumbnailUrl
                            }, true)
                        }}
                        className="group/row cursor-pointer transition-all duration-150 ">
                                        <td className="w-16 pl-6 group-hover/row:bg-white/8 rounded-l-lg text-neutral-400">
                                            <span className="group-hover/row:hidden">{2 + i}</span>
                                            <span className="hidden group-hover/row:block text-white">{
                                                <PlayIcon className="w-4 h-4"/>
                                            }</span>
                                        </td>
                                        <td className="p-3 pr-6 group-hover/row:bg-white/8 rounded-r-lg"><VideoListThumbnail video={video}/></td>
                                        
                        </tr>

                    })
                }
            </tbody>
        </table>
        </div>
            </div> : <p className="text-white">...</p>
        }
    </div>
}