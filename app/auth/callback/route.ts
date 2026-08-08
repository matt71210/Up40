import { NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error("Erreur exchangeCodeForSession:", error.message)
      // En cas d'erreur, on redirige quand meme vers /result
      // L'utilisateur verra qu'il n'est pas connecte
    }
  }

  // Redirection forcee vers /result
  return NextResponse.redirect(new URL("/result", requestUrl.origin))
}
