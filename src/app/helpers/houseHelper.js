import { Apartment, HouseIcon, OtherIcon } from "../components/icons";
import Image from "next/image";

export const houseType = {
	apartment: Apartment,
	detached: HouseIcon,
	semi: HouseIcon,
	terraced: HouseIcon,
	other: HouseIcon,
};

export const getIcon = (type) => {
	const Icon = houseType[type.toLowerCase()];
	return <Icon className="w-4 h-4 mr-1" />;
};

export const houseImage = {
	apartment: "/assets/images/apartment.jpeg",
	detached: "/assets/images/detached.jpeg",
	semi: "/assets/images/semi.png",
	terraced: "/assets/images/terrace.jpeg",
	other: "/assets/images/unknown.jpeg",
};

export const getHouseImage = (type) => {
	return houseImage[type.toLowerCase()];
};

export const formatPrice = (price) => {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	}).format(price);
};
