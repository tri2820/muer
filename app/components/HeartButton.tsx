import { useState } from "react";
import Lottie from "lottie-react";
import heartAnimation from "../../public/heart.json";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function HeartButton({ heartedStateCallback }: any) {
    const [hearted, setHearted] = useState(false);

    return <div className="w-6 h-6 relative">
        <HeartIcon
            className={`peer/hearticon text-gray-300 hover:text-white cursor-pointer ${
                hearted ? 'opacity-0' : ''
                
                }`}
            onClick={() => {
                setHearted(!hearted);
                heartedStateCallback?.(!hearted);
            }}
        />

        {hearted &&
        <div className="overflow-hidden w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        -mt-0.5
        scale-125
        peer-hover/hearticon:brightness-150
        pointer-events-none
        "
        >
            <Lottie
                autoplay={true}
                loop={false}
                animationData={heartAnimation}
                className='w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                ' />

        </div>
        }
    </div>
}
