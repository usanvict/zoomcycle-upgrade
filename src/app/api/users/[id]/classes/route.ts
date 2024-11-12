import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(null, { status: 401 });
	}

	const registeredClasses = await prisma.classRegistration.findMany({
		where: {
			participantId: Number.parseInt(params.id),
		},
		include: {
			SpinningClass: true,
		},
	});

	// Map the response to only return class details
	const classes = registeredClasses.map(
		(registration) => registration.SpinningClass,
	);

	return NextResponse.json(classes);
}
