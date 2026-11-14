
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";
const intlProxy = createMiddleware(routing);
const protectedRoutes = ['/profile/settings', '/cart']

export default async function proxy(req: NextRequest) {
 const jwt = await getToken({
  req,
  secret: process.env.BETTER_AUTH_SECRET,
  secureCookie: req.nextUrl.protocol === 'https:',
})
  if (jwt == null) {
  const locale = req.nextUrl.pathname.split('/')[1] || 'en'
return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: ["/(en|ar)/cart","/(en|ar)/profile/settings"]
};