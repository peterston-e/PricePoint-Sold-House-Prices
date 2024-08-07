import { options } from "./api/auth/[...nextauth]/options";
import UserCard from "./components/userCard";
import { getServerSession } from "next-auth/next";
import Hero from "./components/hero";
import SearchButton from "./components/searchButton";
import HouseCard from "./components/houseCard";

export default async function Home() {
	const session = await getServerSession(options);

	const tempObject = {
		price: 750000,
		address: "6 Bronsart Road, SW6 6AA",
		date: "22/06/23",
		type: "Terraced",
		tenure: "Freehold",
		distance: "150m",
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<div className="container mx-auto max-w-[356px] my-6 border-2 rounded-md flex-grow">
				<UserCard user={session?.user} />
				<Hero />
				<SearchButton />
				<HouseCard record={tempObject} />
				<HouseCard record={tempObject} />
				<HouseCard record={tempObject} />
			</div>
		</div>
	);
}
