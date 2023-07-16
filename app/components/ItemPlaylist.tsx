import { HeartIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "@remix-run/react";
import { t } from "~/utils";
import PlaylistIcon from "./PlaylistIcon";

export default function ItemPlaylist({playlist}: any){
    const isHearted = playlist.type == 'hearted'
    return  <NavLink
    to={`playlist/${playlist.id}`}
    className={({ isActive, isPending }) =>
    "flex items-center space-x-2 px-2 py-2 hover:bg-white/2 rounded-lg cursor-pointer"
    + t(isActive, 'bg-white/8')
    }>
    <PlaylistIcon 
        className="rounded shadow-lg shadow-black w-10 h-10" 
        isHearted={isHearted}
        iconClassName='w-4 h-4'
        />

    <div className="space-y-1">
        
        <p className={
            'font-medium text-sm'
            + t(isHearted, 'text-green-500', 'text-white')
        }>
            {
                playlist.name
            }
        </p>
      
        <p className="text-neutral-400 font-medium text-xs">{playlist.creator}</p>
    </div>
  </NavLink>
}


