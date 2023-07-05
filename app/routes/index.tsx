import { EllipsisVerticalIcon, PauseCircleIcon, BackwardIcon, ForwardIcon, RectangleGroupIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { Bars3BottomRightIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import CImage from "~/components/cimage";
import { useSupabase } from "~/models/user.server";
import { fromNow } from "~/utils";

import { Resizable, ResizableBox } from 'react-resizable';
import { useEffect, useState } from "react";
import VideoThumbnail from "~/components/videoThumbnail";



export async function loader({ request }: LoaderArgs) {
  // const { supabase, response } = useSupabase(request);
  // const url = new URL(request.url);
  // const page = parseInt(url.searchParams.get("page") ?? '0')

  try {
    const trendingResponse = await fetch('https://iv.melmac.space/api/v1/trending');
    const trendingVideos = await trendingResponse.json();
    // return trendingVideos;
    return json({ trendingVideos },
      // { headers: response.headers }
    );
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    return json({})
  }
};

// const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
// type Literal = z.infer<typeof literalSchema>;
// type Json = Literal | { [key: string]: Json } | Json[];

// const jsonSchema: z.ZodType<Json> = z.lazy(() =>
//   z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
// );

const stringToJSONSchema = z.string()
  .transform((str, ctx) => {
    try {
      return JSON.parse(str)
    } catch (e) {
      console.log(str);
      ctx.addIssue({ code: 'custom', message: 'Invalid JSON' })
      return z.NEVER
    }
  })


export async function action({ request, params }: ActionArgs) {
  return json({})

  //   return redirect(`/video/${videoId}`, { headers: response.headers });
}

export default function IndexPage() {
  const { trendingVideos } = useLoaderData();
  const [thumbnails, setThumbnails] = useState<any[]>([]);
  useEffect(() => {
    const thumbnails = trendingVideos.map((video: any) => {
      const thumbnail = video.videoThumbnails.find((x: any) => x.quality == 'maxresdefault');
      return <VideoThumbnail author={video.author} title={video.title} url={thumbnail.url} />
    })
    setThumbnails(thumbnails)
  }, [trendingVideos])
  // const actionData = useActionData();

  // const [timer, setTimer] = useState<any>()
  // const fetcher = useFetcher();

  // const inputOnChange = async (event: any) => {
  //   const value = event.target.value;
  //   clearTimeout(timer);
  //   if (value == '') {
  //     setQuickSearchResults([])
  //     setTimer(null);
  //     return;
  //   }


  //   const t = setTimeout(() => {
  //     console.log('debug fetching news')
  //     fetcher.load(`/video?q=${value}`);
  //   }, 100)
  //   setTimer(t);
  // }

  // const [quickSearchResults, setQuickSearchResults] = useState<any[]>([]);
  // useEffect(() => {
  //   console.log('debug done fetching', fetcher.data)
  //   if (!fetcher.data) return;
  //   if (fetcher.data.error) return;
  //   if (!fetcher.data.result) return;
  //   setQuickSearchResults(fetcher.data.result);
  //   setTimer(null);
  //   // setFetchingNews(false);
  // }, [fetcher.data]);


  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-grow flex mt-2 h-0">
        <ResizableBox
          className="flex"
          width={500}
          handle={<div className="h-full w-2 hover:cursor-e-resize flex-none 
          opacity-0 hover:opacity-100
          transition-opacity relative" >
            <EllipsisVerticalIcon className="absolute w-4 h-4 text-white top-1/2 -translate-x-1" />
          </div>}
          minConstraints={[100, 100]}
          resizeHandles={['e']}
          axis="x"
        >
          <div className="bg-neutral-900 
          overflow-y-hidden hover:overflow-y-auto scrollbar scrollbar-thumb-white/40 hover:scrollbar-thumb-white/60 scrollbar-track-transparent
          rounded-lg
          flex-grow
          px-4 py-3
          ">
            <div className="flex items-center text-neutral-400 space-x-2">
              <RectangleStackIcon className="w-6 h-6" />
              <span className="font-semibold">Your Library</span>
            </div>
          </div>
        </ResizableBox>

        {/* <div className="bg-neutral-900 overflow-y-auto rounded-lg resize-x">
          <p>One</p>
        </div> */}

        {/* Container two */}

        <div className="
        bg-neutral-900 
        rounded-lg bg-gradient-to-b from-violet-950/80 from-10% via-neutral-900
        p-4
        overflow-y-auto scrollbar scrollbar-thumb-white/40 hover:scrollbar-thumb-white/60 scrollbar-track-transparent
        overflow-x-hidden
        w-full
        ">


          <p className="text-white font-bold text-3xl">Good morning</p>
          <p className="text-white font-bold text-2xl py-8">Trending</p>

          {
            <div className="grid grid-cols-3 gap-6">
              {
                thumbnails
              }
            </div>
          }


          <div className="py-16">
            <p className="text-sm text-white font-semibold py-2">Organization</p>
            <p className="text-sm text-neutral-400 py-2">Rider is a modern, open source front-end to both decentralized and centralized music. Powered by Invidious.</p>
          </div>

        </div>



        {/* <div className=" bg-neutral-900 overflow-y-auto rounded-lg">
          <p>One</p>
        </div> */}
      </div>

      <div className="flex-none bg-black h-20 grid grid-cols-5 px-4">
        <div className="col-span-1 flex space-x-4 items-center">
          <CImage className="w-12 h-12 object-cover rounded-lg" src='https://iv.melmac.space/vi/Fqey8LxQxFU/maxresdefault.jpg' />
          <div>
            <p className="text-sm text-white font-semibold line-clamp-1">An Thần</p>
            <p className="text-xs text-neutral-400 line-clamp-1">Low G, Thắng</p>
          </div>

        </div>

        <div className="col-span-3 flex items-center ">
          <div className="space-y-1 w-full ">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <BackwardIcon className="w-6 h-6 text-neutral-400" />
                <PauseCircleIcon className="w-10 h-10 text-white" />
                <ForwardIcon className="w-6 h-6 text-neutral-400" />
              </div>
            </div>


            <div className="w-2/3 space-x-2 mx-auto flex items-center">
              <p className="text-xs text-neutral-400">1:34</p>
              <div className="h-1 bg-white w-full rounded-full" />
              <p className="text-xs text-neutral-400" >3:21</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex items-center space-x-2">
          <Bars3BottomRightIcon className="w-6 h-6 text-neutral-400" />
          <SpeakerWaveIcon className="w-6 h-6 text-neutral-400" />
          <div className="h-1 bg-white w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

