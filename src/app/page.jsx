import { options } from "./api/auth/[...nextauth]/options";
import UserCard from "./components/usercard";
import { getServerSession } from "next-auth/next";
import Hero from "./components/hero";
import SearchButton from "./components/searchButton.unused";
import HouseCard from "./components/houseCard";
import SearchSection from "./components/searchSection";

export default async function Home() {
	const session = await getServerSession(options);

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<div className="container mx-auto max-w-[356px] my-6 border-2 rounded-md flex-grow">
				<UserCard user={session?.user} />
				<Hero />
				<SearchSection />
			</div>
		</div>
	);
}
