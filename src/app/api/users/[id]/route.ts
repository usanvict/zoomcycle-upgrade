import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const spinningClasses = await prisma.spinningClass.findMany();
	return NextResponse.json(spinningClasses);
}

export async function POST(request: Request) {
	const json = await request.json();

	const created = await prisma.spinningClass.create({
		data: json,
	});

	return new NextResponse(JSON.stringify(created), { status: 201 });
}
