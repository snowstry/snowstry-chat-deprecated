import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { FaAndroid, FaCode, FaDev, FaServer } from 'react-icons/fa'
import log from "@shared/logger";

export const Badges = ({ badges }) => {
	const { data: session } = useSession();

    if(!badges) return

	return (
		<>
            {badges.map((badge) => (
                <div className="inline-flex p-1">
                    {badge.name === "Staff" && (
                        <FaCode title="Staff" />
                    )}
                    {badge.name === "Beta Tester" && (
                        <FaAndroid title="Beta Tester" />
                    )}
                    {badge.name === "backend" && (
                        <FaServer title="Backend" />
                    )}
                </div>          
			))}             
		</>
	);
};
