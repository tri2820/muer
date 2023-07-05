import { useState } from "react"
import ReactPlayer from "react-player"

export default function Player({ url, playing, onStart, onBuffer, onBufferEnd, onReady, onProgress, onPause, onEnded }: any) {


    if (!url) return <></>

    return <ReactPlayer
        onBuffer={onBuffer}
        onBufferEnd={onBufferEnd}
        onReady={onReady}
        onStart={onStart}
        onProgress={onProgress}
        onPause={onPause}
        onEnded={onEnded}
        playing={playing}
        className="hidden"
        pip={false}
        url={url} />
}