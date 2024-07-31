import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function RunBapp() {
	const session = await getServerSession(options);

	return (
		<>
			{session ? (
				<div>user card would go here</div>
			) : (
				<div>This is protected by another type of authentication</div>
			)}
		</>
	);
}
