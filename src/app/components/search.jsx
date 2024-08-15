export default function Search({ onSearch, isLoading }) {
	return (
		<button
			id="sold-house-search"
			aria-label="sold-house-search"
			onClick={onSearch}
			disabled={isLoading}
			className="w-full bg-blue-500 hover:bg-blue-700 active:bg-blue-800 active:transform active:scale-95 text-white font-bold py-2 px-4 rounded my-11 transition duration-150 ease-in-out"
		>
			{isLoading ? "Searching..." : "Search Now"}
		</button>
	);
}
