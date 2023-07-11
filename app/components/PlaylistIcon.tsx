import { HeartIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { t } from "~/utils";

export default function PlaylistIcon({isLikedSongs, className, iconClassName}: any){
    return <div className={
        'bg-neutral-700  shadow-neutral-900/50 flex items-center justify-center' 
        + t(isLikedSongs, 'bg-gradient-to-br from-indigo-700 to-teal-100/60')
        + ` ${className} `
    }>
        {
            isLikedSongs ? 
            <HeartIcon className={
                'text-white' + ` ${iconClassName} `} /> : 
            <MusicalNoteIcon className={
                'text-white' + ` ${iconClassName} `} />
        }
    </div>
}