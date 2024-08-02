import { options } from "./api/auth/[...nextauth]/options";
import UserCard from "./components/userCard";
import { getServerSession } from "next-auth/next";
import Hero from "./components/hero";
import SearchButton from "./components/searchButton";

export default async function Home() {
	const session = await getServerSession(options);
	return (
		<div className="min-h-screen flex flex-col">
			<div className="container mx-auto max-w-[356px] my-6 border-2 rounded-md flex-grow">
				<UserCard user={session?.user} />
				<Hero />
				<SearchButton />
			</div>
		</div>
	);
}
