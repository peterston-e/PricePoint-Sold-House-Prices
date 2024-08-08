import { Apartment, HouseIcon, OtherIcon } from "../components/icons";
import Image from "next/image";

export const houseType = {
	apartment: Apartment,
	detached: HouseIcon,
	semi: HouseIcon,
	terraced: HouseIcon,
	other: HouseIcon,
	f: Apartment, // Assuming 'F' stands for Flat
	s: HouseIcon, // Assuming 'S' stands for Semi-detached
	t: HouseIcon, // Assuming 'T' stands for Terraced
	d: HouseIcon, // Assuming 'D' stands for Detached
	o: OtherIcon, // For 'Other' type
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
	apartment: "/assets/images/apartment.jpeg",
	detached: "/assets/images/detached.jpeg",
	semi: "/assets/images/semi.png",
	terraced: "/assets/images/terrace.jpeg",
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
