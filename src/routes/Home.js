import Nweet from "components/Nweet";
import { dbService } from "myFirebase";
import React, { useEffect, useState } from "react";

export default function ({ userObj }) {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		// getNweets();
		dbService.collection("nweets").onSnapshot((snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setNweets(nweetArray);
		});
	}, []);

	async function onSubmit(event) {
		event.preventDefault();
		await dbService.collection("nweets").add({
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
		});
		setNweet("");
	}

	function onChange(event) {
		const {
			target: { value },
		} = event;

		if (value.length < 120) setNweet(value);
	}
	// console.log(nweets);
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
					value={nweet}
					onChange={onChange}
				></input>
				<input type="submit" value="Nweet"></input>
			</form>
			<div>
				{nweets.map((nweetObj) => (
					<Nweet
						nweetObj={nweetObj}
						key={nweetObj.id}
						isOwner={nweetObj.creatorId === userObj.uid}
					/>
				))}
			</div>
		</div>
	);
}
