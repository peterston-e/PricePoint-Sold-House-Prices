"use client";
import { useState, useEffect } from "react";

export default function SearchButton() {
	const [position, setPosition] = useState({
		latitude: null,
		longitude: null,
	});
	const [postCode, setPostCode] = useState("");
	const [nearestPostcodes, setNearestPostcodes] = useState([]);
	const [justPostcodesArray, setJustPostcodesArray] = useState([]);
	const [postResult, setPostResult] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		// This code runs when `someValue` changes
		const lat = position.latitude;
		const long = position.longitude;
		const apiEndpoint = `https://findthatpostcode.uk/points/${lat},${long}.json`;
		const postcodeArrayEndpoint = `https://api.postcodes.io/postcodes?lon=${long}&lat=${lat}&radius=200`;

		(async function () {
			if (position.latitude && position.longitude) {
				const reverseResponse = await fetch(apiEndpoint);
				const locationData = await reverseResponse.json();
				setPostCode(locationData.data.relationships.nearest_postcode.data.id);
				const getArray = await fetch(postcodeArrayEndpoint);
				const pcArray = await getArray.json();
				setNearestPostcodes(pcArray.result);
				// query the db with each postcode and add them to an array

				setJustPostcodesArray(pcArray.result.map((pc) => pc.postcode));
				// nearestPostcodes.forEach((pc) => justPostcodesArray.push(pc.postcode));
			}
		})();
	}, [position]); // Dependency array

	const makePostRequest = async (postcodes) => {
		const apiEndpoint = "http://localhost:3000/api";
		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.NEXT_PUBLIC_API_KEY,
			},
			body: JSON.stringify({ postcodes }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		// console.log(data);
		return data;
	};

	useEffect(() => {
		if (justPostcodesArray.length > 0) {
			const fetchData = async () => {
				try {
					const result = await makePostRequest(justPostcodesArray);
					setPostResult(result);
				} catch (error) {
					console.error("Error fetching data:", error);
					setPostResult(null);
				}
			};

			fetchData();
		}
	}, [justPostcodesArray]);

	useEffect(() => {
		console.log(postResult);
	}, [postResult]);

	const handleClick = () => {
		navigator.geolocation.getCurrentPosition(
			(p) =>
				setPosition({
					latitude: p.coords.latitude.toFixed(6),
					longitude: p.coords.longitude.toFixed(6),
				}),
			(error) => setError("Failed to get location: " + error.message)
		);
	};

	return (
		<div className="w-full px-2">
			<button
				onClick={handleClick}
				className="w-full bg-blue-500 hover:bg-blue-700 active:bg-blue-800 active:transform active:scale-95 text-white font-bold py-2 px-4 rounded my-11 transition duration-150 ease-in-out"
			>
				Search Now
			</button>
			{position.latitude && (
				<>
					<div className="text-center text-sm text-gray-400">
						{`Latitude: ${position.latitude}, Longitude: ${position.longitude}`}
					</div>
					<div className="text-center text-sm text-gray-400">
						{`Postcode: ${postCode}`}
					</div>

					{nearestPostcodes.length > 0 &&
						nearestPostcodes.map((pc) => (
							<div className="text-center text-sm text-gray-400">
								{pc.postcode}
							</div>
						))}
				</>
			)}
		</div>
	);
}
