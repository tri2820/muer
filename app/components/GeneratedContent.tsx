import icon from '../../public/icon.png'
import HoverCard from "./HoverCard"
import CImage from "./cimage"

export const GeneratedContent = ({ image_url, children, index, brokenImageCallback, total, summaries, showTopicSelector }: any) => {
    // const [showDetails, setShowDetails] = useState(true)
    // const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);
    // const [hoveredContent, setHoveredContent] = useState<any>(null);
    // const { supabase } = useOutletContext<{ supabase: SupabaseClient }>()

    return <HoverCard>
        <div className='p-4 text-sm  bg-white rounded-lg border'>

            <div className="flex items-center">
                <img
                    src={icon}
                    className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                    <p className="font-bold">GenMe</p>
                    <p className="font-normal text-gray-500">@genmeapp</p>
                </div>
            </div>
            <div className="mt-3 mb-1">
                {
                    children
                }
            </div>
            <CImage
                brokenImageCallback={brokenImageCallback}
                className="
    mt-3
    object-cover 
    aspect-video 
    border-gray-300 
    rounded-lg 
    border 
    hover:shadow
    cursor-pointer
    "
                src={image_url}
            />
        </div>
    </HoverCard>
}