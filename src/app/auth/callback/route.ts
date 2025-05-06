import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  let redirectUrl = "/dashboard";
  if (redirectTo) {
    try {
      const decodedUrl = decodeURIComponent(redirectTo);
      const url = new URL(decodedUrl);
      if (url.origin === request.nextUrl.origin) {
        redirectUrl = decodedUrl;
      }
    } catch (error) {
      console.error("Invalid redirectTo URL:", error);
    }
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
