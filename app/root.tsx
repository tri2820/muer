import type {
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ClientOnly } from "remix-utils";



import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

export const meta: MetaFunction = () => {
  return { title: "GenMe" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export async function loader({ request }: LoaderArgs) {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    COMMIT_REF: process.env.COMMIT_REF!
  }

  return json({
    user: await getUser(request),
    env
  });
};

export default function App() {
  const { env } = useLoaderData<typeof loader>()
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  )

  return (
    <html lang="en" className="h-full scrollbar-none">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full font-inter">
        <Outlet context={{ supabase, env }} />
        <ScrollRestoration />
        <script async src="https://analytics.umami.is/script.js" data-website-id="c5be99c2-ff1e-4af1-9a2e-99f571f2d804" data-domains="genme.app" />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
