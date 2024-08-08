"use client";

import { useState, useEffect } from "react";
import useGeoSearch from "../hooks/useGeoSearch";
import Search from "./search";
import HouseCard from "./houseCard";

export default function SearchSection() {
	const [searchResults, setSearchResults] = useState(null);
	const [hasSearched, setHasSearched] = useState(false); // added for debugging
	const { getLocation, isLoading, error, houseData } = useGeoSearch();

	const handleSearch = async () => {
		setHasSearched(true);
		try {
			await getLocation();
		} catch (error) {
			console.error("Error searching", error);
		}
	};

	useEffect(() => {
		if (houseData && houseData.length > 0) {
			setSearchResults(houseData);
		} else if (hasSearched) {
			setSearchResults([]);
		}
	}, [houseData, hasSearched]);

	return (
		<div className="w-full px-2">
			<Search onSearch={handleSearch} isLoading={isLoading} />

			{error && <p className="text-red-500">Error: {error.toString()}</p>}

			{!isLoading && hasSearched && searchResults !== null && (
				<>
					{searchResults.length > 0 ? (
						searchResults.map((house, index) => {
							return <HouseCard key={index} record={house} />;
						})
					) : (
						<p>No results found. Try another search.</p>
					)}
				</>
			)}
		</div>
	);
}
