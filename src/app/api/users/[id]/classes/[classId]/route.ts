import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params: { id, classId } }: { params: { id: string; classId: string } },
) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(null, { status: 401 });
	}

	const spinningClass = await prisma.classRegistration.findFirst({
		where: {
			participantId: Number.parseInt(id, 10),
			classId: Number.parseInt(classId, 10),
		},
	});
	return NextResponse.json(spinningClass);
}

export async function POST(
	request: Request,
	{ params: { id, classId } }: { params: { id: string; classId: string } },
) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(null, { status: 401 });
	}

	const json = await request.json();

	const registration = await prisma.classRegistration.create({
		data: {
			...json,
			participantId: Number.parseInt(id),
			classId: Number.parseInt(classId),
		},
	});

	return new NextResponse(JSON.stringify(registration), { status: 201 });
}

export async function DELETE(
	request: Request,
	{ params: { id, classId } }: { params: { id: string; classId: string } },
) {
	const session = await getServerSession();
	if (!session) {
		return new NextResponse(null, { status: 401 });
	}

	const deletedSpinningClass = await prisma.classRegistration.delete({
		where: {
			participantId_classId: {
				participantId: Number.parseInt(id, 10),
				classId: Number.parseInt(classId, 10),
			},
		},
	});
	return NextResponse.json(deletedSpinningClass);
}
