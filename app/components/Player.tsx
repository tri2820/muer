import { useState } from "react"
import ReactPlayer from "react-player"

export default function Player({ playerRef, url, playing, onStart, onBuffer, onBufferEnd, onReady, onProgress, onPause, onEnded, onDuration }: any) {


    if (!url) return <></>

    return <ReactPlayer
        ref={playerRef}
        onBuffer={onBuffer}
        onBufferEnd={onBufferEnd}
        onReady={onReady}
        onStart={onStart}
        onProgress={onProgress}
        onPause={onPause}
        onEnded={onEnded}
        playing={playing}
        onDuration={onDuration}
        className="hidden"
        pip={false}
        url={url} />
}