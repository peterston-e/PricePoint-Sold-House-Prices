import { NextResponse } from "next/server";
import searchPostcode from "./mongodb";
// import { headers } from "next/headers";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/options";

const opts = {
	points: 120, // Number of points TODO: change this to 12
	duration: 60, // Per 60 seconds
};

const rateLimiter = new RateLimiterMemory(opts);

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		await rateLimiter.consume(session.user.email, 1);
	} catch (rateLimiterRes) {
		return NextResponse.json({
			success: false,
			data: [],
			message: "Rate limit exceeded",
		});
	}
	return NextResponse.json({ message: "hello from the api." });
}

export async function POST(request) {
	try {
		// sets the rate limit for the user
		try {
			const session = await getServerSession(authOptions);

			await rateLimiter.consume(session.user.email, 1);
		} catch (rateLimiterRes) {
			return NextResponse.json({
				success: false,
				data: [],
				message: "Rate limit exceeded",
			});
		}

		const { postcodes } = await request.json();

		const result = await Promise.all(
			postcodes.map(async (postcode) => {
				return await searchPostcode(postcode);
			})
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
