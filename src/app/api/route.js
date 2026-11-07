import { NextResponse } from "next/server";
import searchPostcode from "./mongodb";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
	points: 12, // Number of requests allowed per client
	duration: 60, // Per 60 seconds
});

// postcodes.io returns at most 100 postcodes per radius lookup
const MAX_POSTCODES = 100;

// There is no login, so rate limit by the caller's IP address.
// Vercel sets x-forwarded-for; the first entry is the client.
function getClientIp(request) {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();
	return request.headers.get("x-real-ip") ?? "unknown";
}

async function isRateLimited(request) {
	try {
		await rateLimiter.consume(getClientIp(request), 1);
		return false;
	} catch {
		return true;
	}
}

const rateLimitResponse = () =>
	NextResponse.json(
		{ success: false, data: [], message: "Rate limit exceeded" },
		{ status: 429 }
	);

export async function GET(request) {
	if (await isRateLimited(request)) return rateLimitResponse();
	return NextResponse.json({ message: "hello from the api." });
}

export async function POST(request) {
	if (await isRateLimited(request)) return rateLimitResponse();

	try {
		const { postcodes } = await request.json();

		if (!Array.isArray(postcodes) || postcodes.length > MAX_POSTCODES) {
			return NextResponse.json(
				{ success: false, data: [], message: "Invalid postcodes" },
				{ status: 400 }
			);
		}

		const result = await Promise.all(
			postcodes.map((postcode) => searchPostcode(postcode))
		);

		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({
			success: false,
			data: [],
			message: error.message,
		});
	}
}
