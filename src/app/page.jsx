import Hero from "./components/hero";
import SearchSection from "./components/searchSection";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<div className="container mx-auto max-w-[356px] my-6 border-2 rounded-md flex-grow">
				<Hero />
				<SearchSection />
			</div>
		</div>
	);
}
