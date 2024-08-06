import Image from "next/image";
import { CalenderIcon, DocumentIcon } from "./icons";
import { getIcon, getHouseImage, formatPrice } from "../helpers/houseHelper";

const house = {
	image: "/assets/images/detached.jpeg",
};

export default function HouseCard({ record }) {
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
					{formatPrice(record.price)}
				</div>
				<div className="mb-3 text-slate-600">{record.address}</div>
				<div className="flex items-center justify-between my-1 text-slate-400">
					<span className="text-[10px] flex items-center">
						<CalenderIcon className="w-[14px] h-[14px] mr-1" />
						{record.date}
					</span>
					<span className="text-[10px] flex items-center">
						{getIcon(record.type)}
						{record.type}
					</span>
					<span className="text-[10px] flex items-center">
						<DocumentIcon className="w-4 h-4 mr-1" />
						{record.tenure}
					</span>
				</div>
				<div className="absolute top-0 right-0 text-sky-600 text-xs">
					{record.distance}
				</div>
			</div>
		</div>
	);
}
