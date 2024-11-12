import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
	const spinningClass = await prisma.spinningClass.findUnique({
		where: {
			id: Number.parseInt(id, 10),
		},
	});
	return NextResponse.json(spinningClass);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
	const json = await request.json();
	const updatedSpinningClass = await prisma.spinningClass.update({
		where: {
			id: Number.parseInt(id, 10),
		},
		data: {
			time: json.time || null,
			music: json.music || null,
			language: json.language || null,
			paidMembers: json.paidMembers || null,
			walkIns: json.walkIns || null,
			participants: json.participants || null,
			ClassRegistration: json.ClassRegistration || null,
			Trainer: json.Trainer || null,
			trainerId: json.trainerId || null,
		},
	});
	return NextResponse.json(updatedSpinningClass);
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
	const json = await request.json();
	const patchedSpinningClass = await prisma.spinningClass.update({
		where: {
			id: Number.parseInt(id, 10),
		},
		data: json,
	});
	return NextResponse.json(patchedSpinningClass);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
	const deletedSpinningClass = await prisma.spinningClass.delete({
		where: {
			id: Number.parseInt(id, 10),
		},
	});
	return NextResponse.json(deletedSpinningClass);
}
