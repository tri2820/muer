import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useOutletContext, Outlet } from "@remix-run/react";
import { zx } from "zodix";
import { z } from "zod";
import { json } from "react-router";
import { randomFetch } from "~/utils";
import { useEffect, useState } from "react";
import VideoThumbnail from "~/components/videoThumbnail";



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
}

export default function SearchPage() {
    const context = useOutletContext<any>();

    return <div className="px-6 py-8 rounded-lg ">
        <Form method="post">

            <input type="text" name="q" className="
            focus:outline-none
            focus:ring-none
            border-2
            border-white
            border-opacity-0
            focus:border-opacity-100
            bg-white/10 hover:bg-white/20 shadow  text-white px-4 py-2 rounded-full
            placeholder:text-neutral-400
            "
                placeholder="Search"
            />
        </Form>



        <Outlet context={context} />

    </div>

}