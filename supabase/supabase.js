import { createClient } from "@supabase/supabase-js"

const projectURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const projectKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabase = createClient(projectURL, projectKey)