import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"; //SupaBase user auth
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function StudyItems(props) {
	//SupaBase user auth
	const supabase = useSupabaseClient();
	const user = useUser();

	const [studyItems, setStudyItems] = React.useState(fetchStudyItems, []);

	useEffect(() => {
		fetchStudyItems();
	});

	const fetchStudyItems = async () => {
		let { data: study_items, error } = await supabase
			.from("StudyListComponents")
			.select("*")
			.order("id", true);
		if (error) console.log("error", error);
		else setStudyItems(study_items);
	};

	const addStudyItem = async () => {
		let { data: study_items, error } = await supabase
			.from("StudyListComponents")
			.insert({ user_id: user.id })
			.single();
		if (error) setError(error.message);
		else setStudyItems(study_items);
	};

	const deleteStudyItem = async (id) => {
		try {
			await supabase.from("StudyListComponents").delete().eq("id", id);
			setStudyItems(studyItems.filter((studyItem) => studyItem.id != id));
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div>
			{studyItems?.map((studyItem) => (
				<StudyItem
					key={studyItem.id}
					studyItem={studyItem}
					onDelete={() => deleteStudyItem(studyItem.id)}
				/>
			))}
			<hr></hr>
			<button onClick={addStudyItem}>Create Study Item</button>
		</div>
	);
}

function StudyItem({ studyItem, onDelete }) {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [isOpen, setIsOpen] = React.useState(studyItem.is_open);
	const [groupName, setGroupName] = React.useState(studyItem.group_name);
	const [groupLink, setGroupLink] = React.useState(studyItem.group_link);
	const [groupDesc, setGroupDesc] = React.useState(studyItem.group_desc);

	const toggle = async () => {
		try {
			const { data, error } = await supabase
				.from("StudyListComponents")
				.update({ is_open: !isOpen })
				.eq("id", studyItem.id)
				.single();
			if (error) {
				throw new Error(error);
			}
			setIsOpen(!isOpen);
		} catch (error) {
			console.log("error", error);
		}
	};

	const updateText = async (name, input_text) => {
		try {
			const { data, error } = await supabase
				.from("StudyListComponents")
				.update({ [name]: input_text })
				.eq("id", studyItem.id)
				.single();
			if (error) {
				throw new Error(error);
			}
			if (name === "group_name") {
				setGroupName(input_text);
			} else if (name === "group_link") {
				setGroupLink(input_text);
			} else if (name === "group_desc") {
				setGroupDesc(input_text);
			} else {
				throw "Error. Update text name does not match any known names.";
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div>
			<div id={`studyGroupNumber${studyItem.id}`}>
				<div className={styles.studyListHeaderContainer}>
					<button onClick={toggle}>
						{studyItem.is_open ? "Close" : "Open"}
					</button>
					<form className={styles.studyGroupName}>
						<input
							name="group_name"
							types="text"
							placeholder="Create a Study Group"
							onChange={(e) => updateText("group_name", e.target.value)}
							value={groupName}
						/>
					</form>
				</div>

				{studyItem.is_open ? (
					<div className={styles.studyListItemBody}>
						<form>
							<input
								className={styles.studyListItemBody}
								name="group_link"
								type="text"
								placeholder="Enter a link here"
								onChange={(e) => updateText("group_link", e.target.value)}
								value={groupLink}
							/>
							<textarea
								name="group_desc"
								type="text"
								placeholder="Enter notes here"
								onChange={(e) => updateText("group_desc", e.target.value)}
								value={groupDesc}
							/>
						</form>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onDelete();
							}}
						>
							{" "}
							Remove Item{" "}
						</button>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}
//studyGroup > StudyItems >  studyItem
