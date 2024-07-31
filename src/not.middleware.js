import { NextResponse } from "next/server";

// export function middleware(request) {
// 	const apiKey = request.headers.get("x-api-key");
// 	const expectedApiKey = process.env.API_KEY;

// 	if (request.nextUrl.pathname.startsWith("/api")) {
// 		if (apiKey !== expectedApiKey) {
// 			return new NextResponse(
// 				JSON.stringify({ success: false, message: "Invalid API key" }),
// 				{ status: 401, headers: { "content-type": "application/json" } }
// 			);
// 		}
// 	}

// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: "/api/",
// };
