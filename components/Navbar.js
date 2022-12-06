import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { userAgent } from "next/server";
import styles from "../styles/Navbar.module.css";
// import Timer from "./Timer";

export default function Navbar() {
	const supabase = useSupabaseClient();
	const user = useUser();

	async function signOut() {
		const { error } = await supabase.auth.signOut();
	}
	console.log(user);
	return (
		<nav>
			<div className={styles.navbar}>
				<h1> Study List </h1>
				{user ? (
					<ul className={styles.loggedInUser}>
						{/* <li>
							{" "}
							<Timer />
						</li> */}
						<li className={styles.userName}> {user.email} </li>
						<button className={styles.signOut} onClick={signOut}>
							{" "}
							Sign out{" "}
						</button>
					</ul>
				) : null}
			</div>
		</nav>
	);
}
