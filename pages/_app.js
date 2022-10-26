import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<Component {...pageProps} />
		</SessionContextProvider>
	);
}
export default MyApp;

//1. create a unique page for each user which has a unique slug? do I need a unique slug or can I just fetch unique data?
//2. check to make sure that user is auth'd and then fetch their stored items; use RLS row level security
//3. get all the functionality working, like adding/deleting things with state and database calls
//4. add a user page, and ability to delete account/export list as a csv
