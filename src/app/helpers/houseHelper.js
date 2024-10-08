import { Apartment, HouseIcon } from "../components/icons";
import Image from "next/image";

export const houseType = {
	f: Apartment,
	s: HouseIcon,
	t: HouseIcon,
	d: HouseIcon,
	o: HouseIcon,
};

export const getIcon = (type) => {
	if (!type) {
		console.warn("getIcon called with undefined type");
		return null;
	}
	const Icon = houseType[type.toLowerCase()];
	return <Icon className="w-4 h-4 mr-1" />;
};

export const houseImage = {
	f: "/assets/images/apartment.jpeg",
	s: "/assets/images/semi.png",
	t: "/assets/images/terrace.jpeg",
	d: "/assets/images/detached.jpeg",
	o: "/assets/images/unknown.jpeg",
};

export const getHouseImage = (type) => {
	if (!type) {
		console.warn("getHouseImage called with undefined type");
		return "/assets/images/unknown.jpeg";
	}
	return houseImage[type.toLowerCase()] || "/assets/images/unknown.jpeg";
};

export const formatPrice = (price) => {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}).format(price);
};

export const expandType = (type) => {
	const typeMap = {
		d: "Detached",
		s: "Semi",
		t: "Terraced",
		f: "Apartment",
		o: "Other",
	};
	return typeMap[type.toLowerCase()] || type;
};

export const expandTenure = (tenure) => {
	const tenureMap = {
		f: "Freehold",
		l: "Leasehold",
	};
	return tenureMap[tenure.toLowerCase()] || tenure;
};

export const formatAddress = (address) => {
	if (!address) return "Address not available";

	// Split the address into parts
	const parts = address.split(",");

	// Format the street part (first part)
	const streetPart = parts[0]
		.trim()
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase());

	// If there's a postcode part, keep it uppercase
	const postcodePart = parts.length > 1 ? parts[1].trim().toUpperCase() : "";

	// Join the formatted parts
	return `${streetPart}, ${postcodePart}`.trim();
};
