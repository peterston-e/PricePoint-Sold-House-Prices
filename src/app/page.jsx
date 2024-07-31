import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import UserCard from "./components/usercard";
import { getServerSession } from "next-auth/next";

export default async function Home() {
	const session = await getServerSession(options);
	return (
		<>
			<h1>Home</h1>
			<UserCard user={session?.user} pagetype={"Home"} />
		</>
	);
}
