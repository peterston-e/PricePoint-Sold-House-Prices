// import { NextResponse } from "next/server";

// export async function GET() {
// 	return NextResponse.json({ message: "hello from the api." });
// }

// export async function POST(request) {
// 	const { postcode } = await request.json();
// 	return NextResponse.json({ receivedData: postcode });
// }

import { NextResponse } from "next/server";
import searchPostcode from "./mongodb";

// temp hard coded postcode
// const postcode = "BN1 8AB";

export async function GET() {
	return NextResponse.json({ message: "hello from the api." });
}

export async function POST(request) {
	try {
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
