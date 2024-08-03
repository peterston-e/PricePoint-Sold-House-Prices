import Image from "next/image";

export default function HouseCard() {
	return (
		<div className="flex items-center justify-between gap-2 p-2 ">
			<div className="rounded-full min-h-10 min-w-10">
				{user?.image && (
					<Image
						className="rounded-full"
						src=""
						alt=""
						width={50}
						height={50}
						priority={true}
					/>
				)}
			</div>
			<div className="grow"></div>
		</div>
	);
}
