"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const RegisterForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					"Content-Type": "applciation/json",
				},
			});

			if (!res.ok) {
				throw (await res.json()).err;
			}

			signIn();
		} catch (error: unknown) {
			setError("User already exists!");
		}
		console.log("Register!");
	};

	return (
		<form onSubmit={onSubmit} className="space-y-12 w-72">
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="email">Email</Label>
				<Input
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="email"
					type="email"
				/>
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="password">Password</Label>
				<Input
					required
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
					Create Account
				</Button>
			</div>
		</form>
	);
};
