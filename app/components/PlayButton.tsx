import { PlayIcon } from "@heroicons/react/20/solid";

export default function({className, iconClassName}: any){
    return <div className="flex">
        <div className="hover:scale-105"> 
        <button className={
            '  bg-green-500 hover:bg-green-400 rounded-full shadow-lg shadow-neutral-900/50' 
            + ` ${className} `
            }>
                <PlayIcon className={'text-black' + ` ${iconClassName} `} />
        </button>
    </div>
    </div>
            
}