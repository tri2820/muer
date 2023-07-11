import { HeartIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { t } from "~/utils";

export default function ItemPlaylist({type}: any){
    const isLikedSongs = type == 'likedsongs';
    

    return  <div className="flex items-center space-x-2 px-2 py-2 hover:bg-white/2 rounded-lg cursor-pointer">
    <div className={
        'w-10 h-10 bg-neutral-700 rounded shadow-lg shadow-neutral-900/50 flex items-center justify-center' 
        + t(isLikedSongs, 'bg-gradient-to-br from-indigo-700 to-teal-100/60')
    }>
        {
            isLikedSongs ? 
            <HeartIcon className="w-4 h-4 text-white" /> : 
            <MusicalNoteIcon className="w-4 h-4 text-white" />
        }
    </div>

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
      
        <p className="text-neutral-400 font-medium text-xs">Various Artists</p>
    </div>
  </div>
}


