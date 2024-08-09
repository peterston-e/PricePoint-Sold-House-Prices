import { useState } from "react";

export default function useGeoSearch() {
	const [position, setPosition] = useState({
		latitude: null,
		longitude: null,
	});
	const [nearestPostcode, setNearestPostcode] = useState(null);
	const [surroundingPostcodes, setSurroundingPostcodes] = useState([]);
	const [houseData, setHouseData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getCurrentPosition = () => {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(p) => {
					const newPosition = {
						latitude: p.coords.latitude.toFixed(6),
						longitude: p.coords.longitude.toFixed(6),
					};
					setPosition(newPosition);
					console.log("New position:", newPosition); // Log the position here
					resolve(newPosition);
				},
				(error) => {
					const errorMsg = "Failed to get location: " + error.message;
					setError(errorMsg);
					reject(errorMsg);
				}
			);
		});
	};

	const getNearestPostcode = async (position) => {
		// Placeholder implementation - replace with actual API call
		const { latitude: lat, longitude: long } = position;
		const apiEndpoint = `https://findthatpostcode.uk/points/${lat},${long}.json`;
		const reverseResponse = await fetch(apiEndpoint);
		const locationData = await reverseResponse.json();

		const newNearestPostcode =
			locationData.data.relationships.nearest_postcode.data.id;

		console.log("Nearest postcode:", newNearestPostcode); // Log the nearest postcode here, before setting state

		setNearestPostcode(newNearestPostcode);

		return newNearestPostcode;
	};

	const getSurroundingPostcodes = async (position) => {
		const { latitude: lat, longitude: long } = position;
		const postcodeArrayEndpoint = `https://api.postcodes.io/postcodes?lon=${long}&lat=${lat}&radius=200`;
		const getArray = await fetch(postcodeArrayEndpoint);
		const pcArray = await getArray.json();
		const newSurroundingPostcodes = pcArray.result.map((pc) => pc.postcode);
		setSurroundingPostcodes(newSurroundingPostcodes);
		console.log("Surrounding postcodes:", newSurroundingPostcodes); // Log the surrounding postcodes.

		return newSurroundingPostcodes;
	};

	const transformHouseData = (rawData) => {
		return rawData.flatMap((postcodeData) =>
			postcodeData.data.map((house) => ({
				price: house.price,
				address: `${house.paon} ${house.street}, ${house.postcode}`,
				date: house.date, // TODO format this
				type: house.property_type,
				tenure: house.duration,
				distance: "150m", // TODO calculate this dynamically
			}))
		);
	};

	const getHouseData = async (surroundingPostcodes) => {
		const apiEndpoint = "/api";
		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ postcodes: surroundingPostcodes }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const rawHouseData = await response.json();
		const newHouseData = transformHouseData(rawHouseData);

		console.log("House data:", newHouseData); // Log the house data.
		setHouseData(newHouseData);

		return newHouseData;
	};

	const getLocation = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const position = await getCurrentPosition();
			console.log("Position in getLocation:", position); // Log the position here too

			// Implement these functions when declared properly
			const newNearestPostcode = await getNearestPostcode(position);
			console.log("Postcode in getLocation:", newNearestPostcode); // Log the postcode.

			const newSurroundingPostcodes = await getSurroundingPostcodes(position);
			console.log("Postcode radius in getLocation:", newSurroundingPostcodes); // Log the postcode in 200m radius.

			const newHouseData = await getHouseData(newSurroundingPostcodes);
			console.log("House data in getLocation:", newHouseData); // Log the house data.

			setIsLoading(false);
		} catch (error) {
			setError(error);
			setIsLoading(false);
		}
	};

	return {
		getLocation,
		nearestPostcode,
		surroundingPostcodes,
		isLoading,
		error,
		houseData,
	};
}
