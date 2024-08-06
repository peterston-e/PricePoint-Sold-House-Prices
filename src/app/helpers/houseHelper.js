import { Apartment, HouseIcon, OtherIcon } from "../components/icons";

export const houseType = {
	apartment: Apartment,
	detached: HouseIcon,
	semi: HouseIcon,
	terraced: HouseIcon,
	other: OtherIcon,
};

export const getIcon = (type) => {
	const Icon = houseType[type.toLowerCase()];
	return <Icon className="w-4 h-4 mr-1" />;
};
