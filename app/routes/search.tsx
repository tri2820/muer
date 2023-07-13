import { ActionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useOutletContext, Outlet, useFetcher } from "@remix-run/react";
import { zx } from "zodix";
import { z } from "zod";
import { json } from "react-router";
import { randomFetch } from "~/utils";
import { useEffect, useState } from "react";
import VideoThumbnail from "~/components/videoThumbnail";


export const meta: MetaFunction = () => {
    return { title: "Muer - Search" };
};

export async function action({ request, params }: ActionArgs) {
    const validate_results = await zx.parseFormSafe(request, {
        q: z.string({
            invalid_type_error: 'q is not string',
            required_error: 'q is required'
        }).trim().min(1).max(256)
    });

    if (validate_results.success == false) {
        console.log('error validate form', validate_results.error)
        return json({
            errors: validate_results.error.errors.map(e => e.message)
        });
    }
    const url = `/search/${validate_results.data.q}`;
    return redirect(url);
    // return json({})
}

export default function SearchPage() {
    const context = useOutletContext<any>();
    // const fetcher = useFetcher()

    return <div className="px-6 py-8">
        <Form method="post">

            <input type="text" name="q" className="
            focus:outline-none
            focus:ring-none
            border-2
            border-white
            border-opacity-0
            focus:border-opacity-100
            bg-white/8 hover:bg-white/12 
            hover:outline hover:outline-1 hover:outline-neutral-600
            shadow shadow-neutral-900/50 text-white px-5 py-3.5 rounded-full
            placeholder:text-neutral-500
            text-xs
            font-medium
            w-80
            "
                placeholder="What do you want to listen to?"
            />
        </Form>

        <Outlet context={context} />

    </div>

}