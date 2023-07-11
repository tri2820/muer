import CImage from "./cimage";

export default function VideoListThumbnail(){
    return <div className="flex items-center space-x-2">
            
          <CImage
              className="object-cover aspect-video w-32 rounded shadow-lg shadow-neutral-900/50"
              src={'https://i.ytimg.com/vi/pGvza2HNqAU/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAFm2p2WyK9DC9-nRidu-Ar61OchQ'}
              widthLargerThan={960}
              heightLargerThan={640}
          />

          <div className="space-y-2">
              <p className="text-white font-medium line-clamp-1">NAPOLEON - Official Trailer - In Cinemas November 23, 2023</p>
              <p className=" text-neutral-400 font-medium line-clamp-1">Trang, Khoa Vũ</p>
          </div>
          </div>

}