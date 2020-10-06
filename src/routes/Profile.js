import { authService } from "myFirebase";
import React from "react";
import { useHistory } from "react-router-dom";

export default function () {
	const history = useHistory();

	async function onLogOutClick() {
		// console.log(authService.currentUser);
		await authService.signOut();
		// console.log(authService.currentUser);
		history.push("/");
	}
	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
}
