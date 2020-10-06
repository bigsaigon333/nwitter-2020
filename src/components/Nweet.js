import { dbService } from "myFirebase";
import React, { useState } from "react";

export default function Nweet({ nweetObj: nweet, isOwner }) {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweet.text);

	async function onDeleteClick(event) {
		const ok = window.confirm("Are you sure to delete this nweet?");
		if (!ok) return;
		await dbService.doc(`nweets/${nweet.id}`).delete();
	}

	function toggleEditing() {
		setEditing((prev) => !prev);
	}

	function onChange(event) {
		const {
			target: { value },
		} = event;

		setNewNweet(value);
	}

	async function onSubmit(event) {
		event.preventDefault();

		await dbService.doc(`nweets/${nweet.id}`).update({ text: newNweet });
		setEditing(false);
	}

	return (
		<div>
			{editing
				? isOwner && (
						<>
							<form onSubmit={onSubmit}>
								<input
									type="input"
									required
									value={newNweet}
									onChange={onChange}
								/>
								<input type="submit" value="Update" />
							</form>
							<button onClick={toggleEditing}>Cancel</button>
						</>
				  )
				: isOwner && (
						<>
							<h4>{nweet.text}</h4>
							<button onClick={onDeleteClick}>Delete</button>
							<button onClick={toggleEditing}>Edit</button>
						</>
				  )}
		</div>
	);
}
