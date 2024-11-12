import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const skip = request.nextUrl.searchParams.get("skip");
	const take = request.nextUrl.searchParams.get("take");
	const spinningClasses = await prisma.spinningClass.findMany({
		skip: skip ? Number.parseInt(skip, 10) : undefined,
		take: take ? Number.parseInt(take, 10) : undefined,
	});
	return NextResponse.json(spinningClasses);
}

export async function POST(request: Request) {
	const json = await request.json();

	const created = await prisma.spinningClass.create({
		data: json,
	});

	return new NextResponse(JSON.stringify(created), { status: 201 });
}
