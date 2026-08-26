import { auth } from "./auth";

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && request.nextUrl.pathname !== "/admin/login" && !isLoggedIn) {
    const loginUrl = new URL("/admin/login", request.nextUrl.origin);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return Response.redirect(loginUrl);
  }

  return undefined;
});

export const config = {
  matcher: ["/admin/:path*"],
};