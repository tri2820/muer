import { EllipsisVerticalIcon, PauseCircleIcon, BackwardIcon, ForwardIcon, RectangleGroupIcon, RectangleStackIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { Bars3BottomRightIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { z } from "zod";
import CImage from "~/components/cimage";
import { useSupabase } from "~/models/user.server";
import { fromNow } from "~/utils";

import { Resizable, ResizableBox } from 'react-resizable';
import { useEffect, useRef, useState } from "react";
import VideoThumbnail from "~/components/videoThumbnail";
import { Range, getTrackBackground } from 'react-range';



import Player from "~/components/Player";
import ReactPlayer from "react-player";



export async function loader({ request }: LoaderArgs) {
  // const { supabase, response } = useSupabase(request);
  // const url = new URL(request.url);
  // const page = parseInt(url.searchParams.get("page") ?? '0')

  try {

    const trendingResponse = await fetch('https://iv.melmac.space/api/v1/trending?type=music');
    const trendingVideos = await trendingResponse.json();
    // TODO: Cache url
    // return trendingVideos;
    return json({ trendingVideos },
      // { headers: response.headers }
    );
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    return json({})
  }
};


export async function action({ request, params }: ActionArgs) {
  const { videoId } = await request.json();
  try {
    console.log('Fetching video data')
    const response = await fetch(`https://iv.melmac.space/api/v1/videos/${videoId}`);
    const video = await response.json();
    console.log('got video');
    return json({ video });
  } catch (error) {
    console.error('Error fetching video:', error);
    return json({});
  }

  //   return redirect(`/video/${videoId}`, { headers: response.headers });
}

export default function IndexPage() {
  const { trendingVideos } = useLoaderData();
  const actionData = useActionData();
  const [thumbnails, setThumbnails] = useState<any[]>([]);
  const [playingVideoData, setPlayingVideoData] = useState<{ [key: string]: any } | null>();

  const [playerState, setPlayerState] = useState({
    playing: false,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    buffering: false,
    duration: undefined as (number | undefined),
    progressValues: [0]
  })

  const submit = useSubmit();

  useEffect(() => {
    const { video } = actionData || {};
    setPlayingVideoData(video);
    setPlayerState({
      playing: video ? true : false,
      played: 0,
      playedSeconds: 0,
      loaded: 0,
      loadedSeconds: 0,
      buffering: false,
      duration: undefined,
      progressValues: [0]
    })
  }, [actionData])


  useEffect(() => {
    const thumbnails = trendingVideos.map((video: any) => {
      const thumbnail = video.videoThumbnails.find((x: any) => x.quality == 'maxresdefault');
      return <VideoThumbnail
        key={video.videoId}
        onThumbnailClick={onThumbnailClick}
        author={video.author} title={video.title} url={thumbnail.url} videoId={video.videoId}
      />
    })
    setThumbnails(thumbnails)
  }, [trendingVideos])

  const onThumbnailClick = async ({ videoId, thumbnailUrl, title, author }: any) => {
    console.log('clicked', videoId);
    // if (video.videoId == playingVideoData.videoId) {
    //   return;
    // }

    setPlayingVideoData({
      videoThumbnails: [{
        url: thumbnailUrl
      }],
      title,
      author
    })

    setPlayerState(p => ({
      playing: true,
      played: 0,
      playedSeconds: 0,
      loaded: 0,
      loadedSeconds: 0,
      buffering: true,
      duration: undefined,
      progressValues: [0]
    }))

    submit(
      { videoId: videoId },
      { method: "post", encType: "application/json" }
    );
    // try {
    //   const response = await fetch(`http://iv.melmac.space/api/v1/videos/${videoId}`);
    //   const video = await response.json();
    //   console.log('video', video)
    // } catch (error) {
    //   console.error('Error fetching trending videos:', error);
    // }
  }


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

  useEffect(() => {
    console.log('playerState', playerState)
  }, [playerState])

  const playerRef = useRef<ReactPlayer | null>(null);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* <p className="bg-purple-400 px-4 py-2">{JSON.stringify(video)}</p> */}
      {/* <p className="bg-green-400 px-4 py-2">{JSON.stringify(playingVideoData)}</p> */}

      <div className="flex-grow flex mt-2 h-0 mx-2">
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

        {/* Container two */}

        <div className="
        bg-neutral-900 
        rounded-lg bg-gradient-to-b from-violet-950/80 from-10% via-neutral-900
        p-4
        overflow-y-auto scrollbar scrollbar-thumb-white/40 hover:scrollbar-thumb-white/60 scrollbar-track-transparent
        overflow-x-hidden
        w-full
        ">
          <Player
            playerRef={playerRef}
            onReady={() => {
              setPlayerState(p => ({
                ...p,
                playing: true,
                played: 0,
                playedSeconds: 0,
                loaded: 0,
                loadedSeconds: 0
              }))
            }}
            playing={playerState.playing}
            onProgress={({ played, playedSeconds, loaded, loadedSeconds }: any) => {
              setPlayerState(p => ({
                ...p,
                played,
                playedSeconds,
                loaded,
                loadedSeconds,
                progressValues: [played]
              }))


            }}
            onPause={() => setPlayerState(p => ({
              ...p,
              playing: false
            }))}
            onEnded={() => setPlayerState(p => ({
              ...p,
              playing: false,
              played: 0,
              playedSeconds: 0,
              loaded: 0,
              loadedSeconds: 0
            }))}
            onBuffer={() => {
              console.log('Start buffering')
              setPlayerState(p => ({
                ...p,
                buffering: true
              }))
            }}
            onBufferEnd={() => {
              console.log('Done buffering')
              setPlayerState(p => ({
                ...p,
                buffering: false
              }))
            }}
            onDuration={(duration: number) => {
              console.log('debug duration', duration)
              setPlayerState(p => ({
                ...p,
                duration
              }))
            }}
            url={playingVideoData?.adaptiveFormats?.at(0)?.url}
          />

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
          <CImage
            className="w-24 aspect-video object-cover rounded-lg"
            src={playingVideoData?.videoThumbnails?.at(0)?.url}
            brokenImageCallback={() => {
              console.log('debug broken image')
            }}
          />
          <div>
            <p className="text-sm text-white font-semibold line-clamp-1">{
              playingVideoData?.musicTracks?.at(0).song ||
              playingVideoData?.title ||
              'No Title Playing'
            }</p>
            <p className="text-xs text-neutral-400 line-clamp-1">{
              playingVideoData?.musicTracks?.at(0).artist ||
              playingVideoData?.author ||
              'Author'
            }</p>
          </div>

        </div>

        <div className="col-span-3 flex items-center ">
          <div className="space-y-1 w-full ">
            <div className="flex justify-center">
              <div className="flex items-center space-x-3">
                <BackwardIcon className="w-6 h-6 text-neutral-400" />

                <button
                  className={` ${playingVideoData ? 'hover:scale-105' : 'opacity-70'}`}
                  onClick={() => {
                    if (playingVideoData == undefined) return;
                    setPlayerState((p) => ({ ...p, playing: !p.playing }));
                  }}>
                  {
                    playerState.playing ?
                      <PauseCircleIcon className="w-10 h-10 text-white" /> :
                      <PlayCircleIcon className="w-10 h-10 text-white" />
                  }
                </button>

                <ForwardIcon className="w-6 h-6 text-neutral-400" />
              </div>
            </div>


            <div className="w-1/2 space-x-2 mx-auto flex items-center">
              <p className="text-xs text-neutral-400 w-10 text-center">{
                new Date(playerState.playedSeconds * 1000).toISOString().substring(14, 19)
              }</p>

              <Range
                step={0.001}
                min={0}
                max={1}
                values={playerState.progressValues}
                onChange={(values: any) => {
                  setPlayerState((p) => ({
                    ...p,
                    progressValues: values
                  }))

                }}
                onFinalChange={(values: any) => {
                  setPlayerState((p) => ({
                    ...p,
                    progressValues: values
                  }))
                  playerRef?.current?.seekTo(values[0])
                }}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    className='w-full py-1 group flex '
                    style={props.style}
                  >
                    <div
                      className={`w-full h-1 rounded-full overflow-hidden bg-white group-hover:bg-green-500 ${playerState.buffering ? 'animate-pulse' : ''}`}>
                      <div ref={props.ref}
                        style={{
                          background: getTrackBackground({
                            values: playerState.progressValues,
                            colors: [
                              "transparent",
                              playerState.buffering ? "#737373" : '#525252'],
                            min: 0,
                            max: 1
                          })
                        }}
                        className="w-full h-1">
                        {children}
                      </div>
                    </div>

                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    className='invisible group-hover:visible focus:outline-none h-3 w-3 rounded-full shadow bg-white'
                    {...props}
                    style={{
                      ...props.style,
                      ...(isDragged && { visibility: 'visible' })
                    }}
                  />
                )}
              />
              <p className="text-xs text-neutral-400 w-10" >{
                playerState.duration ?
                  new Date(playerState.duration * 1000).toISOString().substring(14, 19) :
                  '--:--'
              }</p>

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

