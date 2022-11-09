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
					margin: 0;
					display: inline-block;
					width: 100%;
				}
			`}</style>
		</SessionContextProvider>
	);
}
export default MyApp;
