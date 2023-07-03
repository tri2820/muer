import { Form } from "@remix-run/react"

export const GeneratedContent = ({ image_url, content, className }: any) => {

    return <div className='p-4 justify-items-stretch text-sm  bg-white shadow rounded-lg border'>
        <div className="text-sm">
            <div className="flex items-center">
                <img
                    src={'https://pbs.twimg.com/profile_images/1645962688441499648/toPLfqfp_400x400.jpg'}
                    className="w-12 h-12 rounded-full"
                />
                <div className="ml-2">
                    <p className="font-bold">Tri Nguyen</p>
                    <p className="font-normal text-gray-500">@fixedp0int</p>
                </div>
                <div
                    className="ml-auto mr-0 flex items-center"
                >
                    {/* <p className="mr-2 bg-black rounded-full py-1 px-4 text-white hover:bg-gray-900 focus:bg-gray-800">Subscribe</p> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#374151" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <p className="mt-2 mb-4">{content}</p>
            {/* <img src={image_url}
                    className="object-cover border 
            border-gray-200 w-full mt-2 rounded-2xl
            aspect-video
            "
                /> */}

            <p className="mt-3 text-gray-500">6:42 AM ・ Jun 4, 2023 ・ <span className="text-black font-bold">433.7K</span> Views</p>

        </div>
    </div>
}