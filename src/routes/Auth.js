import { authService, firebaseInstance } from "myFirebase";
import React, { useState } from "react";

export default function () {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	function onChange(event) {
		const {
			target: { name, value },
		} = event;

		if (name === "email") setEmail(value);
		else if (name === "password") setPassword(value);
	}

	async function onSubmit(event) {
		event.preventDefault();
		try {
			// Create Account
			if (newAccount) {
				const res = await authService.createUserWithEmailAndPassword(
					email,
					password
				);
				console.log(res);
			}
			// Log In
			else {
				const res = await authService.signInWithEmailAndPassword(
					email,
					password
				);
				console.log(res);
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	}

	function toggleAccount() {
		setNewAccount((prev) => !prev);
	}

	async function onSocialClick(event) {
		const {
			target: { name },
		} = event;

		let provider;
		if (name === "google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if (name === "github") {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}

		const res = await authService.signInWithPopup(provider);
		console.log(res);
	}

	return (
		<div>
			<span>Auth</span>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={onChange}
					value={email}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={onChange}
					required
				/>
				<input
					type="submit"
					value={newAccount ? "Sign up" : "Login"}
					required
				/>
				{error}
			</form>
			<span onClick={toggleAccount}>{newAccount ? "Login" : "Sign up"}</span>
			<div>
				<button name="google" onClick={onSocialClick}>
					Continue with Google
				</button>
				<button name="github" onClick={onSocialClick}>
					Continue with Github
				</button>
			</div>
		</div>
	);
}
