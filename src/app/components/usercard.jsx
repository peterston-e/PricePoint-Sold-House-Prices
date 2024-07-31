import Image from "next/image";

export default function UserCard({ user, pagetype }) {
	const emailDisplay = user?.email ? <div>{user?.email}</div> : null;
	const userImage = user?.image ? (
		<Image
			className="rounded-full"
			src={user?.image}
			alt={user?.name ?? "Profile Picture"}
			width={75}
			height={75}
			priority={true}
		/>
	) : null;

	return (
		<div>
			<section>
				{emailDisplay}
				{userImage}
				<p>{pagetype} Page</p>
			</section>
			<form action="http://localhost:3000/api/auth/signout" method="POST">
				<input
					type="hidden"
					name="csrfToken"
					value="90266bf5a8b757e0683882421ecb73729041269c0112ad591049dbb704cc85ae"
				/>
				<button id="submitButton" type="submit">
					Sign Out
				</button>
			</form>
			<a href="/api/auth/signout">
				<button>Sign Out Page</button>
			</a>
		</div>
	);
}
