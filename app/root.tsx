import { HomeIcon as HomeIconSolid, MagnifyingGlassIcon as MagnifyingGlassIconSolid ,RectangleStackIcon } from "@heroicons/react/20/solid";
import { HomeIcon, MagnifyingGlassIcon, Bars3BottomRightIcon, QueueListIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { BackwardIcon, EllipsisVerticalIcon, ForwardIcon, HeartIcon, MusicalNoteIcon, PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import type {
  LinksFunction,
  LoaderArgs,
  MetaFunction
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData
} from "@remix-run/react";
import CImage from "~/components/cimage";

import { useEffect, useRef, useState } from "react";
import { Range, getTrackBackground } from 'react-range';
import { ResizableBox } from 'react-resizable';



import Player from "~/components/Player";


import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';



import { createBrowserClient } from "@supabase/auth-helpers-remix";
import ReactPlayer from "react-player";
import HeartButton from "./components/HeartButton";
import { getUser, requireUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import overlayscrollbars from 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import ItemPlaylist from "./components/ItemPlaylist";
import { t } from "./utils";
import { Video, playerStateAtom, playingVideoDataAtom, playlistsAtom } from "./atoms";

export const meta: MetaFunction = () => {
  return { title: "Muer" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl },{ rel: "stylesheet", href: overlayscrollbars }];
};

export async function loader({ request }: LoaderArgs) {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    COMMIT_REF: process.env.COMMIT_REF!
  }
  console.log('debug root loader')
  return json({
    user: await getUser(request),
    env
  });
};



// export const shouldRevalidate = () => false;


export default function App() {
  const { env } = useLoaderData<typeof loader>()
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  )
  const [playingVideoData, setPlayingVideoData] = useAtom(playingVideoDataAtom);
  const [playlists, setPlaylists] = useAtom(playlistsAtom)
  
  const fetcher = useFetcher();
  // Walkround until https://github.com/remix-run/remix/discussions/2775 implemented
  const [fetcherDataShouldUpdateState, setFetcherDataShouldUpdateState] = useState<'skip_update' | 'update_all' | 'update_keep_queue'>('skip_update');

  useEffect(() => {
    console.log('debug playingVideoData', playingVideoData)
  },[playingVideoData])

  useEffect(() => {
    console.log('debug fetcher.data', fetcher.data)
    const { video } = fetcher.data || {};

    if (!video) {
      console.log('Fetched empty data')
      return
    }

    if (fetcherDataShouldUpdateState == 'skip_update') {
      console.log('Should not update state, fetcher.data could have called effect because user navigated')
      return 
    }

    if (video.videoId != playingVideoData?.videoId) {
      return
    }

    setPlayingVideoData((v: any) => {
      if (!v) return video
      if (fetcherDataShouldUpdateState == 'update_keep_queue') {
        return {
          ...video,
          videoThumbnails: v.videoThumbnails,  
          recommendedVideos: v.recommendedVideos
        }
      } else {
        return {
          ...video,
          videoThumbnails: v.videoThumbnails
        }
      }
    });

    setPlayerState((p) => ({
      ...p,
      buffering: false,
      duration: undefined,
      // progressValues: [0],
      error: false
    }))

    setFetcherDataShouldUpdateState('skip_update')
  }, [fetcher.data])

  useEffect(() => {
    console.log('debug playlists changed', playlists)
  }, [playlists])


  const onHeartClick = async ({ playingVideoData }: any) => {
    console.log('debug heart clicked', playingVideoData);
    const heartedPlaylist = playlists.find(x => x.type ==  'hearted');
    if (!heartedPlaylist) return;
    const hearted = heartedPlaylist.videos.some((video) => video.id == playingVideoData.videoId);

    const thumbnailUrl = playingVideoData?.videoThumbnails?.at(0)?.url;

    const newVideo = {
      id: playingVideoData.videoId,
      author: playingVideoData?.musicTracks?.at(0).artist || playingVideoData?.author || 'Unamed Author',
      title: playingVideoData?.musicTracks?.at(0).song || playingVideoData?.title || 'Unamed Song',
      thumbnailUrl: thumbnailUrl
    };
    heartedPlaylist.videos = hearted ? heartedPlaylist.videos.filter((video) => video.id != playingVideoData.videoId) :  [...heartedPlaylist.videos, newVideo];
    setPlaylists([...playlists])
  }

  const onThumbnailClick = async ({ videoId, thumbnailUrl, title, author }: any, keepQueue = false) => {
    console.log('clicked', videoId);
    if (videoId == playingVideoData?.videoId) {
      setPlayerState((p) => ({
        ...p,
        playing: true
      }))
      return;
    }

    setPlayingVideoData((p) => ({
      recommendedVideos: p?.recommendedVideos ?? [],
      videoThumbnails: [{
        url: thumbnailUrl
      }],
      title,
      author,
      videoId
    }))

    setPlayerState((p) => ({
      ...p,
      playing: true,
      played: 0,
      playedSeconds: 0,
      loaded: 0,
      loadedSeconds: 0,
      buffering: false,
      duration: undefined,
      progressValues: [0],
      error: false
    }))

    // fetcher.submit(
    //   { videoId: videoId },
    //   { method: "post",  }
    // );
    // if (fetcher.state === "idle" && fetcher.data == null) {
    fetcher.load(`/videoData/${videoId}`);
    setFetcherDataShouldUpdateState(keepQueue ? 'update_keep_queue' : 'update_all')
    // }

  }

  const [playerState, setPlayerState] = useAtom(playerStateAtom)

  const playerRef = useRef<ReactPlayer | null>(null);
  const [seekedOnce, setSeekedOnce] = useState(false);
  const [libraryHeaderShowShadow, setLibraryHeaderShowShadow] = useState(false);
  const [resizableWidth, setResizableWidth] = useState(80);
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const _isMobile = window.innerWidth <= 500;
    setIsMobile(_isMobile);
    if (!_isMobile) {
      setResizableWidth(Math.min(280, window.innerWidth / 3));
    }
  }, [])

  return (
    <html lang="en" className="h-full scrollbar-none">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full font-inter">
      
        <div className="min-h-screen bg-black flex flex-col">
          {/* <p className="bg-purple-400 px-4 py-2">{JSON.stringify(actionData?.video)}</p> */}
          {/* <p className="bg-green-400 px-4 py-2">{JSON.stringify(playingVideoData)}</p> */}
          {
            playerState.error &&
            <p className="bg-red-800 px-4 py-2 text-white">Cannot play this song, please try another</p>
          }

          <div className="flex-grow flex mt-2 h-0 mx-2">
            <ResizableBox
              className="flex"
              onResize={ (_, { size }) => setResizableWidth(size.width) }
              width={isMobile ? 80 : Math.min(280, window.innerWidth / 3)}
              handle={<div className="h-full w-2 hover:cursor-e-resize flex-none 
          opacity-0 hover:opacity-100
          transition-opacity relative" >
                <EllipsisVerticalIcon className="absolute w-4 h-4 text-white top-1/2 -translate-x-1" />
              </div>}
              minConstraints={[84, -1]}
              resizeHandles={['e']}
              axis="x"
            >
              <div className="
          overflow-y-hidden 
          
          flex-grow
          flex
          flex-col
          space-y-2
          "
          style={{width: resizableWidth + 'px'}}
          >

                <div className="bg-neutral-900 rounded-lg px-6 py-4 flex-none space-y-6">
                  <NavLink to='/' className={({ isActive, isPending }) =>
                  'flex items-center space-x-4 hover:text-white transition-all' +
                  t(isActive, 'text-white', 'text-neutral-400')
                  }>
                    {({ isActive, isPending }) => <>
                      {isActive ? <HomeIconSolid className="w-6 h-6 flex-none" /> : <HomeIcon className="w-6 h-6 flex-none" />}
                      <p className="font-semibold flex-1 line-clamp-1">Home</p>
                    </>}
                    

                  </NavLink>

                  <NavLink to='/search' className={({ isActive, isPending }) =>
                    'flex items-center  space-x-4 hover:text-white transition-all' +
                    t(isActive, 'text-white', 'text-neutral-400')
                  }>
                    {({ isActive, isPending }) => <>
                      { isActive ? <MagnifyingGlassIconSolid className="w-6 h-6 flex-none" /> : <MagnifyingGlassIcon className="w-6 h-6 flex-none" />}
                      <p className="font-semibold flex-1 line-clamp-1">Search</p>
                    </>}


                  </NavLink>
                </div>

                <div className="bg-neutral-900 rounded-lg flex-1 flex
                flex-col
                overflow-y-hidden 
                ">

                  <div className={"flex items-center text-neutral-400 space-x-4 px-6 flex-none py-4 "
                    + t(libraryHeaderShowShadow, 'shadow-lg shadow-black')
                  }>
                    <RectangleStackIcon className="w-6 h-6 flex-none" />
                    <p className="font-semibold flex-1 line-clamp-1">Your Library</p>
                  </div>
                  <OverlayScrollbarsComponent
                    defer
                    element="div"
                    options={{ scrollbars: { autoHide: 'leave', autoHideDelay: 0 } }}
                    className="px-2 flex-1 py-2"
                    events={{ scroll: (instance, event) => { 
                      const { viewport } = instance.elements();
                      const { scrollLeft, scrollTop } = viewport; 
                      setLibraryHeaderShowShadow(scrollTop > 0)
                   } }}
                    >
                  
                    {
                      playlists.map(playlist => {
                        return <ItemPlaylist key={playlist.id} playlist={playlist}/>
                      })
                    }
                  </OverlayScrollbarsComponent>

                </div>
              </div>
            </ResizableBox>



            
            <OverlayScrollbarsComponent
              defer
              element="div"
              options={{ scrollbars: { autoHide: 'leave', autoHideDelay: 0 } }}
              className="
                bg-neutral-900 
                overflow-y-auto
                overflow-x-hidden
                w-full
                rounded-lg
              ">
              <Outlet context={{ supabase, env, onThumbnailClick, playingVideoData }} />



              </OverlayScrollbarsComponent>
            

          </div>

          <div className="flex-none bg-black h-20 grid space-x-4  grid-cols-3 sm:grid-cols-9 sm:px-4 overflow-hidden">
            <div className="col-span-3 flex space-x-4 items-center px-4 sm:px-0">
              <CImage
                className="w-24 aspect-video object-cover rounded-lg flex-none select-none"
                src={playingVideoData?.videoThumbnails?.at(0)?.url}
                widthLargerThan={960}
                heightLargerThan={640}
              />
              <div className="flex-grow sm:flex-grow-0">
                <p className="text-sm text-white font-semibold line-clamp-1 select-none">{
                  playingVideoData?.musicTracks?.at(0).song ||
                  playingVideoData?.title ||
                  'No Title Playing'
                }</p>
                <p className="text-xs text-neutral-400 line-clamp-1 select-none">{
                  playingVideoData?.musicTracks?.at(0).artist ||
                  playingVideoData?.author ||
                  'Author'
                }</p>
              </div>

              {
                playingVideoData &&
                <div className="flex-none">
                  <HeartButton playingVideoData={playingVideoData} onHeartClick={onHeartClick} hearted={
                    playlists.find(x => x.type == 'hearted')?.videos.some((video) => video.id == playingVideoData.videoId)
                  }/>
                </div>
              }

              
              <button
                      className={'sm:hidden' + t(playingVideoData != undefined, 'hover:scale-105', 'opacity-70')}
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
              
            </div>

            <div className="col-span-3 items-center hidden  sm:flex">
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


                <div className="space-x-2 mx-auto flex items-center ">
                  <p className="text-xs text-neutral-400 w-10 text-center select-none">{
                    new Date(playerState.playedSeconds * 1000).toISOString().substring(14, 19).replace(/^0/, '')
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
                  <p className="text-xs text-neutral-400 w-10 select-none" >{
                    playerState.duration ? 
                    `-${new Date((playerState.duration - playerState.playedSeconds) * 1000).toISOString().substring(14, 19).replace(/^0/, '')}` :
                      '--:--'
                  }</p>

                </div>
              </div>
            </div>

            <div className="col-span-3 items-center space-x-2 justify-end hidden  sm:flex">
            <NavLink to='/radio' className={({ isActive, isPending }) =>
            'relative hover:scale-105' + 
                t(isActive, 'text-green-500 active', 'text-neutral-400 hover:text-white ')}>
                  {({ isActive, isPending }) => <>
                    <QueueListIcon className="w-6 h-6 flex-none" />
                    { isActive && <p className="absolute w-full text-center -bottom-4">•</p> }
                  </>
                  }
            </NavLink>
            <SpeakerWaveIcon className="w-6 h-6 text-neutral-400 flex-none" />
            {/* <div className="h-1 bg-white w-1/2 rounded-full flex-shrink" /> */}
            <div className="w-1/2 flex-shrink">
            <Range
                  step={0.001}
                  min={0}
                  max={1}
                  values={[playerState.volume]}
                  onChange={(values: any) => {
                    setPlayerState((p) => ({
                      ...p,
                      volume: values.at(0)
                    }))

                  }}
                  onFinalChange={(values: any) => {
                    setPlayerState((p) => ({
                      ...p,
                      volume: values.at(0)
                    }))
                    // playerRef?.current?.seekTo(values[0])
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      className='w-full py-1 group flex '
                      style={props.style}
                    >
                      <div
                        className='w-full h-1 rounded-full overflow-hidden bg-white group-hover:bg-green-500'>
                        <div ref={props.ref}
                          style={{
                            background: getTrackBackground({
                              values: [playerState.volume],
                              colors: [
                                "transparent", '#525252'],
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
                </div>
          </div>

            

            <Player
              playerRef={playerRef}
              onVideoError={() => {
                setPlayerState(p => ({
                  ...p,
                  // playing: true,
                  // played: 0,
                  // playedSeconds: 0,
                  // loaded: 0,
                  // loadedSeconds: 0,
                  error: true
                }))
              }}
              onReady={() => {
                console.log('debug on ready', playerState.played)
                // // From cache
                // if (!seekedOnce) {
                //   playerRef?.current?.seekTo(playerState.played, 'fraction')
                //   setSeekedOnce(true)
                // }
                


                // 

                // if (playerState.playing)
                //   playerRef?.current?.play()
                // setInitPlayer(true)
                // setPlayerState(p => ({
                //   ...p,
                  // playing: true,
                  // played: 0,
                  // playedSeconds: 0,
                  // loaded: 0,
                  // loadedSeconds: 0
                // }))
              }}
              playing={playerState.playing}
              onProgress={({ played, playedSeconds, loaded, loadedSeconds }: any) => {
                console.log('debug played 1', played)
                if (playerState.justLoadedFromStorage) {
                  playerRef?.current?.seekTo(playerState.played, 'fraction')
                  setPlayerState((p) => ({
                    ...p,
                    justLoadedFromStorage: false
                  }))
                  return;
                }

                console.log('debug played 2', played)
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
              onQueueEnded={() => {
                setPlayerState(p => ({
                  ...p,
                  playing: false,
                  played: 0,
                  playedSeconds: 0,
                  loaded: 0,
                  loadedSeconds: 0,
                  progressValues: [0]
                }))
                playerRef?.current?.seekTo(0, 'fraction')}
              }
              onBuffer={() => {
                console.log('Start buffering')
                if (!playerState.playing) return;
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
              // Or formatStreams
              // Try only one url
              // Fallback to youtube embed
              urls={
                [
                  playingVideoData?.adaptiveFormats?.at(0)?.url, `https://www.youtube.com/watch?v=${playingVideoData?.videoId}`
                ]
              }
              volume={playerState.volume}
            />

          </div>
        </div>

        <ScrollRestoration />
        {/* <script async src="https://analytics.umami.is/script.js" data-website-id="c5be99c2-ff1e-4af1-9a2e-99f571f2d804" data-domains="" /> */}
        <Scripts />
        <LiveReload />
      </body>
      
    </html>
  );
}
