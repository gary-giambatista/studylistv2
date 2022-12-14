import React from "react";

export default function login() {
	async function signInWithEmail(event) {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
	}

	return (
		<div>
			<h1>login</h1>
			<form onSubmit={signInWithEmail}>
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" />
				<input type="password" id="password" name="password" />
				<button type="submit"> Log in </button>
			</form>
		</div>
	);
}
