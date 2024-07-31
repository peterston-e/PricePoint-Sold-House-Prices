import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function RunCapp() {
	const session = await getServerSession(options);

	if (!session) {
		redirect("/api/auth/signin?callbackUrl=/runcapp");
	}

	return <div>This is where the User card would go for the Capp route</div>;
}
