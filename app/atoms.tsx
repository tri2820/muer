import { atomWithStorage } from "jotai/utils";

export type Video = {
    id: string,
    title: string,
    author: string,
    thumbnailUrl: string | undefined
}

export const playlistsAtom = atomWithStorage('playlists', [
    {id: '0000-0000-0000-0000', type: 'hearted', videos: [] as Video[]},
    {id: '0000-0000-0000-0001', type: 'normal', videos: [] as Video[]},
    {id: '0000-0000-0000-0002', type: 'normal', videos: [] as Video[]}
  ])
  