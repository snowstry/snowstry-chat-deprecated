import { signIn, signOut, useSession } from "next-auth/react";
import { FaHotTub, FaCode } from "react-icons/fa";

export const Badges = ({ badges }) => {
	const { data: session } = useSession();

	if (!badges) return;

	return (
		<>
			{badges.map((badge) => (
				<div className="inline-flex p-1">
					{badge.name === "Staff" && (
						<div className="text-nord_blue-300">
							<FaCode title="Staff" />
						</div>
					)}
					{badge.name === "Beta Tester" && (
						<div className="text-nord_green">
							<FaHotTub title="Beta Tester" />
						</div>
					)}
				</div>
			))}
		</>
	);
};
