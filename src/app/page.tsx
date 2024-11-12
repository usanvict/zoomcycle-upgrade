import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main>
			<div>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							{session ? (
								<LogoutButton /> // Show Logout button if logged in
							) : (
								<LoginButton /> // Show Login button if not logged in
							)}
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div>{session ? <div>Hoj</div> : <div>Nehoj</div>}</div>
		</main>
	);
}
