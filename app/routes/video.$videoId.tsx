import { LoaderArgs, json } from "@remix-run/node";
import { z } from "zod";
import { zx } from "zodix";
import { randomFetch } from "~/utils";

export async function loader({ params }: LoaderArgs) {
    // const { videoId } = await request.json();
    const { videoId } = zx.parseParams(params, {
        videoId: z.string().trim().min(1).max(256)
    });
  
    // TODO: Cache response from other servers
    try {
      console.log('Fetching video data')
      const response = await randomFetch(`api/v1/videos/${videoId}`);
      const video = await response.json();
      console.log('got video');
  
      return json({ video })
    } catch (error) {
      console.error('Error fetching video:', error);
      return json({});
    }
  
    //   return redirect(`/video/${videoId}`, { headers: response.headers });
  }
  