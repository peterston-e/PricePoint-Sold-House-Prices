import Image from "next/image";
import { CalenderIcon, DocumentIcon } from "./icons";
import {
	getIcon,
	getHouseImage,
	formatPrice,
	expandType,
	expandTenure,
} from "../helpers/houseHelper";

export default function HouseCard({ record }) {
	if (!record) {
		console.error("HouseCard received null or undefined record");
		return null;
	}

	return (
		<div className="mt-3 mx-2 flex items-center justify-between gap-2 px-2 py-4 border-0 rounded-xl drop-shadow-xl bg-white">
			<div className="rounded-full min-h-10 min-w-10 mr-3">
				<Image
					className="rounded-full"
					src={getHouseImage(record.type)}
					alt="house"
					width={60}
					height={60}
					priority={true}
				/>
			</div>
			<div className="grow relative">
				<div className="font-black text-xl mt-3">
					{record.price ? formatPrice(record.price) : "Price not available"}
				</div>
				<div className="mb-3 text-slate-600 text-sm">
					{record.address || "Address not available"}
				</div>
				<div className="flex items-center justify-between my-1 text-slate-400">
					<span className="text-[10px] flex items-center">
						<CalenderIcon className="w-[14px] h-[14px] mr-1" />
						{record.date
							? new Date(record.date).toLocaleDateString()
							: "Date not available"}
					</span>
					<span className="text-[10px] flex items-center">
						{record.type && getIcon(record.type)}
						{record.type ? expandType(record.type) : "Type not available"}
					</span>
					<span className="text-[10px] flex items-center">
						<DocumentIcon className="w-4 h-4 mr-1" />
						{record.tenure
							? expandTenure(record.tenure)
							: "Tenure not available"}
					</span>
				</div>
				<div className="absolute top-0 right-0 text-sky-600 text-xs">
					{record.distance || "Distance not available"}
				</div>
			</div>
		</div>
	);
}
