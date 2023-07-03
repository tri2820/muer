import { createServerClient } from "@supabase/auth-helpers-remix"
import invariant from "tiny-invariant"

export const useSupabase = (request: Request, admin = false) => {
  const response = new Response()
  invariant(process.env.SUPABASE_URL)
  

  if (admin) {
    invariant(process.env.SUPABASE_SERVICE_KEY)
    const supabase = createServerClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      {
        request,
        response,
      }
    )
    return {
      supabase,
      response
    }
  }

  invariant(process.env.SUPABASE_ANON_KEY)
  const supabase = createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      request,
      response,
    }
  )
  return {
    supabase,
    response
  }
}