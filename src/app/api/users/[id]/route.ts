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

	const id = params.id;
	const user = await prisma.user.findUnique({
		where: {
			id: Number.parseInt(id),
		},
	});
	return NextResponse.json(user);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
	const json = await request.json();
	const updatedUser = await prisma.user.update({
		where: {
			id: Number.parseInt(id, 10),
		},
		data: {
			password: json.password || null,
			name: json.password || null,
			membership: json.membership || null,
		},
	});
	return NextResponse.json(updatedUser);
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
	const json = await request.json();
	const patchedUser = await prisma.user.update({
		where: {
			id: Number.parseInt(id, 10),
		},
		data: json,
	});
	return NextResponse.json(patchedUser);
}
