import { useState } from "react";
import Lottie from "lottie-react";
import heartAnimation from "../../public/heart.json";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function HeartButton({ heartedStateCallback }: any) {
    const [hearted, setHearted] = useState(false);

    return <div className="w-14 h-14 relative overflow-hidden bg-yellow-500">
        {hearted && <Lottie
            autoplay={true}
            loop={false}
            animationData={heartAnimation}
            className='w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />}

        <button className="w-5 h-5 
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                active:scale-90 transform transition-transform
                "
            onClick={() => {
                setHearted(!hearted);
                heartedStateCallback?.(!hearted);
            }}
        >
            {!hearted &&
                <HeartIcon className="text-gray-100" />
            }
        </button>
    </div>
}
