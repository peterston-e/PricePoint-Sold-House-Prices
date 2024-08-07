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
		console.log("Getting nearest postcode for:", position);
		// Placeholder implementation - replace with actual API call

		return nearestPostcode;
	};

	const getSurroundingPostcodes = async (position) => {
		console.log("Getting surrounding postcodes for:", position);
		// Placeholder implementation - replace with actual API call

		return surroundingPostcodes;
	};

	const getHouseData = async (postcodes) => {
		console.log("Getting house data for postcodes:", postcodes);
		// Placeholder implementation - replace with actual API call

		return houseData;
	};

	const getLocation = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const position = await getCurrentPosition();
			console.log("Position in getLocation:", position); // Log the position here too

			// Implement these functions when declared properly
			// const nearestPostcode = await getNearestPostcodes(position);
			// const surroundingPostcodes = await getSurroundingPostcodes(position);
			// const houseData = await getHouseData(surroundingPostcodes);

			setIsLoading(false);
			// return houseData;  // Uncomment when implemented
		} catch (error) {
			setError(error);
			setIsLoading(false);
		}
	};

	// Other functions remain the same...

	return { getLocation, position, isLoading, error }; // Now including position in the return
}
