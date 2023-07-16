import { atomWithStorage, createJSONStorage } from "jotai/utils";

export type Video = {
    id: string,
    title: string,
    author: string,
    thumbnailUrl: string | undefined
}

export const playlistsAtom = atomWithStorage('playlists', [
    {id: '0000-0000-0000-0000', type: 'hearted', videos: [] as Video[], name:'Liked Songs', creator: 'Muer'},
    {id: '0000-0000-0000-0001', type: 'normal', videos: [] as Video[], name: 'Playlist #1', creator: 'Muer'},
    {id: '0000-0000-0000-0002', type: 'normal', videos: [] as Video[], name: 'Playlist #2', creator: 'Muer'}
  ])

export const playerStateAtom = atomWithStorage('playerState', {
    playing: false,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    buffering: false,
    duration: undefined as (number | undefined),
    progressValues: [0],
    error: false,
    volume: 1,
    justLoadedFromStorage: true
}, {                
    ...createJSONStorage(() => localStorage),                                    
    getItem: (key, initialValue) => {
        const storedValue = localStorage.getItem(key)
        if (!storedValue) return initialValue;
        try {
          const x = JSON.parse(storedValue)
          x.playing = false;
          x.justLoadedFromStorage = true;
          return x
        } catch {
          return initialValue
        }
  }
}
)
  

export const playingVideoDataAtom = atomWithStorage('playingVideoData', null  as { [key: string]: any } | null)