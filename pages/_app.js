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
			<style global jsx>{`
				body {
					background: #15202b;
				}
			`}</style>
		</SessionContextProvider>
	);
}
export default MyApp;

// 11/3
// add conditional rendering for group toggle
// style the main page
// style the login page
// add features and demo to login page, or change it to separate page and forward to login once the app is explained
// add a user page, and ability to delete account/export list as a csv

//10/31
// Add nested lists of studyItems in a component called StudyGroups

//roughly finished
// add a confirmation prompt to deleting a StudyItem > create a component which is rendered with a boolean, toggles off with no, runs delete function with .id prop when yes is clicked and toggled off
// add open feature to URL input to open new tab with the site in it
