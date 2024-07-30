import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ message: "hello from the api." });
}

export async function POST(request) {
	const { postcode } = await request.json();
	return NextResponse.json({ receivedData: postcode });
}
