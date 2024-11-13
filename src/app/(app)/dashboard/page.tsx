"use client";

import { LogoutButton } from "@/app/auth";

export default async function Dashboard() {
	const data = await fetch("https://api.vercel.app/blog");
	const posts = await data.json();

	return (
		<div>
			Super Secret Page
			<ul>
				{posts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
			<LogoutButton />
		</div>
	);
}
