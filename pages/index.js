import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Footer from "../components/Footer.js";
import styles from "../styles/Login.module.css";

import Fetcher from "../components/Fetcher.js";
import Navbar from "../Components/Navbar";
import StudyListPicture from "../public/StudyListSamp.JPG";

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
			{/* <h1> Create your own modular study list</h1> */}
			{!session ? (
				<div className={styles.loginContainer}>
					<h1 className={styles.title}> Create your own modular study list</h1>
					<h3 className={styles.topExplaination}>
						{" "}
						Store study items in groups, all in 1 tab{" "}
					</h3>
					<div className={styles.picture}>
						<Image
							priority
							src={StudyListPicture}
							alt="Picture of the functionality of the site."
							height={862}
							width={1652}
							quality={100}
						/>
					</div>
					<h3 className={styles.explaination}>
						{" "}
						Login to get started, and keep your list automatically saved and
						always up to date
					</h3>
					<div className={styles.auth}>
						<Auth
							supabaseClient={supabase}
							appearance={{ theme: ThemeSupa }}
							theme="dark"
						/>
					</div>
				</div>
			) : (
				<div session={session}>
					<section className={styles.wrapper}>
						<Fetcher />
					</section>
				</div>
			)}
			<Footer />
		</div>
	);
}
