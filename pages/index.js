import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Footer from "../components/Footer.js";
import styles from "../styles/Login.module.css";

import Fetcher from "../components/Fetcher.js";
import Navbar from "../Components/Navbar";

export default function Home() {
	//supabase auth imports
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div
			className={styles.allRenderedComps}
			//style={{ padding: "50px 0 100px 0" }}
		>
			<header>
				<Navbar />
			</header>
			{!session ? (
				<div className={styles.loginContainer}>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						theme="dark"
					/>
				</div>
			) : (
				<div session={session}>
					<div>
						<Fetcher />
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
}
