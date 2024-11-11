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
							<LoginButton />
							<LogoutButton />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</main>
	);
}
