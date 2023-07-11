import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { z } from "zod";
import { zx } from "zodix";
import ThumbnailGrid from "~/components/ThumbnailGrid";
import VideoThumbnail from "~/components/videoThumbnail";
import { randomFetch } from "~/utils";

export async function loader({ params }: LoaderArgs) {
    const { q } = zx.parseParams(params, {
        q: z.string().trim().min(1).max(256)
    });

    try {
        const queryParams = new URLSearchParams({
            q,
            sort_by: 'relevance'
        })
        const url = `api/v1/search?${queryParams}`;
        const response = await randomFetch(url);
        const results = await response.json();
        console.log('got search results');
        return json({
            results,
            q
        })
    } catch (error) {
        console.error('Cannot fetch search results:', error);
        return json({
            errors: ['Cannot fetch search results']
        });
    }
}


export default function SearchPage() {
    const loaderData = useLoaderData();
    const { onThumbnailClick } = useOutletContext<any>()
    const videos = loaderData?.results?.filter((x: any) => x.type == 'video')
    // const musicVideos = videos.filter()

    return <div>
        <p className="text-white font-bold text-2xl tracking-tight py-6">Songs</p>
        <ThumbnailGrid
            videos={videos}
            onThumbnailClick={onThumbnailClick}
        />
    </div>
}