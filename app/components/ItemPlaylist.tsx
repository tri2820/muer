import { HeartIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "@remix-run/react";
import { t } from "~/utils";
import PlaylistIcon from "./PlaylistIcon";

export default function ItemPlaylist({type, id}: any){
    const isLikedSongs = type == 'likedsongs';

    return  <NavLink
    to={`playlist/${id}`}
    className={({ isActive, isPending }) =>
    "flex items-center space-x-2 px-2 py-2 hover:bg-white/2 rounded-lg cursor-pointer"
    + t(isActive, 'bg-white/8')
    }
    
    onClick={() => {

    }}
    >
    <PlaylistIcon 
        className="rounded shadow-lg shadow-black w-10 h-10" 
        isLikedSongs={isLikedSongs}
        iconClassName='w-4 h-4'
        />

    <div className="space-y-1">
        
        <p className={
            'font-medium text-sm'
            + t(isLikedSongs, 'text-green-500', 'text-white')
        }>
            {
                isLikedSongs ? 
                'Liked Songs' : 
                'Let It Out'
            }
        </p>
      
        <p className="text-neutral-400 font-medium text-xs">Author</p>
    </div>
  </NavLink>
}


