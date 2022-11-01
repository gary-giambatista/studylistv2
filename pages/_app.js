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

//10/31
// Add nested lists of studyItems in a component called StudyGroups

//roughly finished
// add a confirmation prompt to deleting a StudyItem > create a component which is rendered with a boolean, toggles off with no, runs delete function with .id prop when yes is clicked and toggled off
// add open feature to URL input to open new tab with the site in it
