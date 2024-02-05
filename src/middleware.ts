import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(

  function middleWare(request: NextRequestWithAuth) {
    const currentPath = request.nextUrl.pathname
    const role = request.nextauth?.token?.role
    console.log(currentPath.startsWith("/admin") && role !== "admin")
    if (currentPath.startsWith("/admin") && role !== "admin") {
      return NextResponse.rewrite(
        new URL("/denied", request.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      }
    }
  },
)
export const config = { matcher: ["/admin", '/admin/activity', "/admin/activity/:type/add"] }