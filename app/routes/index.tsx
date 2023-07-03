import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { z } from "zod";
import { useSupabase } from "~/models/user.server";


export async function loader({ request }: LoaderArgs) {
  const { supabase, response } = useSupabase(request);
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? '0')
  // console.log('debug url', url, page)
  const { data: posts, error } = await supabase.rpc('get_posts', { page })

  if (posts === null) return json([])
  // console.log('debug posts', posts);
  return json(posts, { headers: response.headers });
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
    <div className="min-h-screen bg-[url('../../public/hero.png')] bg-cover bg-center bg-no-repeat">


    </div>
  );
}

