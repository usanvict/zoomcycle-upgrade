import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const password = await hash("test", 12);
	const user = await prisma.user.upsert({
		where: { email: "test@test.com" },
		update: {},
		create: {
			email: "test@test.com",
			name: "Test User",
			password,
			membership: "PAID",
		},
	});
	console.log({ user });

	const trainers = await prisma.trainer.createMany({
		data: [
			{
				id: 1,
				email: "alex.thompson@email.com",
				name: "Alex Thompson",
			},
			{
				id: 2,
				email: "maria.gonzalez@email.com",
				name: "Maria Gonzalez",
			},
		],
	});
	console.log("Created trainer: ", trainers.count);

	const classes = await prisma.spinningClass.createMany({
		data: [
			{
				time: "2024-11-15T09:00:00.000Z",
				music: "Electronic",
				language: "English",
				paidMembers: 20,
				walkIns: 10,
				trainerId: 1,
			},
			{
				time: "2024-11-15T18:00:00.000Z",
				music: "Rock",
				language: "Spanish",
				paidMembers: 20,
				walkIns: 10,
				trainerId: 2,
			},
			{
				time: "2024-11-16T12:00:00.000Z",
				music: "Pop",
				language: "French",
				paidMembers: 20,
				walkIns: 10,
				trainerId: 1,
			},
			{
				time: "2024-11-17T07:30:00.000Z",
				music: "Hip-Hop",
				language: "English",
				paidMembers: 20,
				walkIns: 10,
				trainerId: 2,
			},
			{
				time: "2024-11-17T19:00:00.000Z",
				music: "Classical",
				language: "Italian",
				paidMembers: 20,
				walkIns: 10,
				trainerId: 1,
			},
		],
	});
	console.log("Created classes: ", classes.count);
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
