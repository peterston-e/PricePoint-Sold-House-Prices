"use client";

import { useState } from "react";
import useGeoSearch from "../hooks/useGeoSearch";
import Search from "./search";
import HouseCard from "./HouseCard";

export default function SearchSection() {
	const [searchResults, setSearchResults] = useState([]);
	const { getLocation, isLoading, error } = useGeoSearch();

	// TODO results need to contain the correct data
	const handleSearch = async () => {
		const results = await getLocation();
		if (results) {
			setSearchResults(results);
		}
	};

	return (
		<div className="w-full px-2">
			<Search onSearch={handleSearch} isLoading={isLoading} />

			{error && <p>Error: {error}</p>}
			{searchResults.map((result, index) => (
				<HouseCard key={index} record={result} />
			))}
		</div>
	);
}
