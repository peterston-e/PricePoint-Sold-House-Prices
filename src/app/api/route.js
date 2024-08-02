import { NextResponse } from "next/server";
import searchPostcode from "./mongodb";
import { headers } from "next/headers";

// temp hard coded postcode
// const postcode = "BN1 8AB";

export async function GET() {
	return NextResponse.json({ message: "hello from the api." });
}

export async function POST(request) {
	try {
		// Check for API key
		const headersList = headers();
		const apiKey = headersList.get("x-api-key");

		if (apiKey !== process.env.API_KEY) {
			return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
		}

		const { postcode } = await request.json();
		const result = await searchPostcode(postcode);

		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({
			success: false,
			data: [],
			message: error.message,
		});
	}
}
