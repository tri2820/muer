import { HeartIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { t } from "~/utils";

export default function PlaylistIcon({isHearted, className, iconClassName}: any){
    return <div className={
        'flex-none bg-neutral-700  shadow-neutral-900/50 flex items-center justify-center' 
        + t(isHearted, 'bg-gradient-to-br from-indigo-700 to-teal-100/60')
        + ` ${className} `
    }>
        {
            isHearted ? 
            <HeartIcon className={
                'text-white' + ` ${iconClassName} `} /> : 
            <MusicalNoteIcon className={
                'text-white' + ` ${iconClassName} `} />
        }
    </div>
}