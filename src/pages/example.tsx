import { prisma } from "@/lib/prisma";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page({ user }: Readonly<Props>) {
	return <main>Hello, {user?.name}</main>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const user = await prisma.user.findFirst({
		where: {
			email: "test@test.com",
		},
	});

	return {
		props: {
			user,
		},
	};
};
