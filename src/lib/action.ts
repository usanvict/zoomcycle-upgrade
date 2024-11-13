"use server";

export async function getClasses(userId: string) {
	const id = Number.parseInt(userId);
	try {
		const response = await fetch(`/api/users/${id}/classes`);
		if (!response.ok) {
			throw new Error("Failed to fetch user classes");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error in getUserClasses:", error);
		throw error;
	}
}
