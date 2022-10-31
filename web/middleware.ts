import {
  DEFAULT_APP_PATH,
  DEFAULT_MAIN_PATH,
  PROTECTED_APP_URL_PATHS,
  REFRESH_TOKEN_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from "@app/constants";
import { currentAuthenticatedUserRequest } from "@app/services/server/requests/auth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/main"],
};

// access_token

export async function middleware(request: NextRequest) {
  // Setting cookies on the response
  let response = NextResponse.next();
  const access_token = request.cookies.get(TOKEN_COOKIE_NAME);
  const refresh_token = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME);

  const url = new URL(request.url);

  const deny_redirect = () => {
    response = NextResponse.redirect(url.origin + DEFAULT_APP_PATH);
    response.cookies.delete(TOKEN_COOKIE_NAME);
    response.cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
  };

  const protected_path = PROTECTED_APP_URL_PATHS.includes(url.pathname);

  if (protected_path && (!refresh_token || !access_token)) {
    deny_redirect();
    // Next codition, if all tokens are presents
  } else if (protected_path) {
    const res = await currentAuthenticatedUserRequest(access_token!).catch(
      console.error
    );
    if (!res) {
      deny_redirect();
    } else {
      response.headers.set("x-user", JSON.stringify(res.data));
    }
  } else if (!protected_path && (refresh_token || access_token)) {
    response = NextResponse.redirect(url.origin + DEFAULT_MAIN_PATH);
  }

  return response;
}