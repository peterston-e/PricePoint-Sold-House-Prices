import Image from "next/image";
import SignOut from "./signout";

export default function UserCard({ user }) {
	return (
		<div className="flex items-center justify-between gap-2 p-2 ">
			<div className="rounded-full min-h-10 min-w-10">
				{user?.image && (
					<Image
						className="rounded-full"
						src={user.image}
						alt={user?.name ?? "Profile Picture"}
						width={50}
						height={50}
						priority={true}
					/>
				)}
			</div>
			<div className="grow">
				{user?.name && <p className="text-[16px] font-bold">{user.name}</p>}
				{user?.email && (
					<p className="text-[12px] text-neutral-500">{user.email}</p>
				)}
			</div>
			<SignOut />
		</div>
	);
}
