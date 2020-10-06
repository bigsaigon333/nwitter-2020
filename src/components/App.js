import React, { useEffect, useState } from "react";
import Router from "./Router";

import myFirebase, { authService } from "../myFirebase";

export default function () {
	// console.log(authService.currentUser);
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObj(user);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);
	// setInterval(() => console.log(authService.currentUser), 1000);
	return (
		<>
			{init ? (
				<Router isLoggedIn={isLoggedIn} userObj={userObj} />
			) : (
				"Initializing"
			)}
			<footer>&copy; Danny Kim {new Date().getFullYear()}</footer>
		</>
	);
}
