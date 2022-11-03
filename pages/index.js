import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { fileURLToPath } from "url";
import Fetcher from "../components/Fetcher.js";
import Navbar from "../Components/Navbar";
import StudyGroup from "../components/StudyGroup.js";

export default function Home() {
	//supabase auth imports
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div className="container" style={{ padding: "50px 0 100px 0" }}>
			{!session ? (
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					theme="dark"
				/>
			) : (
				<div session={session}>
					<header>
						<Navbar />
					</header>
					<div>
						<Fetcher />
					</div>
				</div>
			)}
		</div>
	);
}
