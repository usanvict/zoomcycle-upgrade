import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();
		const hashed = await hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashed,
			},
		});

		return NextResponse.json({
			user: {
				email: user.email,
			},
		});
	} catch (err: unknown) {
		return new NextResponse(
			JSON.stringify({
				err: (err instanceof Error ? err : new Error(String(err))).message,
			}),
			{
				status: 400,
			},
		);
	}
}
