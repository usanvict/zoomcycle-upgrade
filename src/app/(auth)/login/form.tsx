"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams?.get("callbackUrl") ?? "/dashboard";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email,
				password,
				callbackUrl,
			});

			if (!res?.error) {
				router.push(callbackUrl);
			} else {
				throw res?.error;
			}
		} catch (error: unknown) {
			setError("Invalid email or password");
		}
		console.log("Login!");
	};

	return (
		<form onSubmit={onSubmit} className="space-y-12 w-72">
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="email">Email</Label>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="email"
					type="email"
				/>
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="password">Password</Label>
				<Input
					autoComplete="off"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					id="password"
					type="password"
				/>
			</div>
			{error && (
				<Alert>
					<Terminal className="h-4 w-4" />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<div className="w-full">
				<Button className="w-full" size="lg">
					Login
				</Button>
			</div>
		</form>
	);
};
