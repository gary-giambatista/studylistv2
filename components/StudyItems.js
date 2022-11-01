import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"; //SupaBase user auth
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "../styles/StudyItems.module.css";

export default function StudyItems(props) {
	//SupaBase user auth
	const supabase = useSupabaseClient();
	const user = useUser();

	const [studyItems, setStudyItems] = React.useState(fetchStudyItems, []);

	useEffect(() => {
		fetchStudyItems();
	}, []);

	const fetchStudyItems = async () => {
		let { data: study_items, error } = await supabase
			.from("StudyListComponents")
			.select("*")
			.order("id", true);
		if (error) console.log("error", error);
		else setStudyItems(study_items);
		//console.log(JSON.stringify(study_items));
	};

	const addStudyItem = async () => {
		let { data: study_items, error } = await supabase
			.from("StudyListComponents")
			.insert([{ user_id: user.id }])
			.select()
			.single();
		if (error) setError(error.message);
		else console.log(JSON.stringify(study_items));
		setStudyItems([...studyItems, study_items]);
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
					fetchStudyItems={fetchStudyItems}
					onDelete={() => deleteStudyItem(studyItem.id)}
				/>
			))}
			<button className={styles.addButton} onClick={addStudyItem}>
				Create Study Item
			</button>
		</div>
	);
}

function StudyItem({ studyItem, onDelete, fetchStudyItems, toggleModule }) {
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
			fetchStudyItems();
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
	//opens groupLink in a new tab
	function openLink(url) {
		window.open(url);
	}
	//state for confirmation of deleting an item
	const [isShown, setIsShown] = React.useState(false);
	//controls visbility of the delete confirmation
	function toggleModule() {
		setIsShown((prevShown) => !prevShown);
	}

	return (
		<div className={styles.studyBody}>
			<div className={styles.studyItems} id={`studyGroupNumber${studyItem.id}`}>
				<div className={styles.studyItemTopContainer}>
					<button
						onClick={toggle}
						className={
							studyItem.is_open
								? styles.toggleCloseButton
								: styles.toggleOpenButton
						}
					>
						{studyItem.is_open ? "Close" : "Open"}
					</button>
					<form onSubmit={(e) => e.preventDefault()}>
						<DebounceInput
							className={styles.studyGroupName}
							name="group_name"
							types="text"
							placeholder="Create a Study Item"
							minLength={1}
							debounceTimeout={500}
							onChange={(e) => updateText("group_name", e.target.value)}
							value={groupName}
						/>
					</form>
				</div>

				{studyItem.is_open ? (
					<div>
						<form
							className={styles.studyItemBody}
							onSubmit={(e) => e.preventDefault()}
						>
							<div className={styles.topInputAndButton}>
								<DebounceInput
									className={styles.groupLink}
									name="group_link"
									type="text"
									placeholder="Enter a link here"
									minLength={1}
									debounceTimeout={500}
									onChange={(e) => updateText("group_link", e.target.value)}
									value={groupLink}
								/>
								<button
									className={styles.urlOpenButton}
									onClick={() => openLink(groupLink)}
								>
									Open link
								</button>
							</div>
							<DebounceInput
								className={styles.groupDesc}
								element="textarea"
								name="group_desc"
								type="text"
								placeholder="Enter notes here"
								minLength={1}
								debounceTimeout={400}
								onChange={(e) => updateText("group_desc", e.target.value)}
								value={groupDesc}
							/>
						</form>
						<button
							className={styles.removeButton}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								toggleModule();
							}}
						>
							{" "}
							Remove Item{" "}
						</button>
						<ConfirmDelete
							className={styles.testing}
							isShown={isShown}
							setIsShown={setIsShown}
							toggleModule={toggleModule}
							onDelete={onDelete}
						/>
					</div>
				) : null}
			</div>
			<hr className={styles.lineBreak}></hr>
		</div>
	);
}

export function ConfirmDelete({ onDelete, isShown, toggleModule }) {
	return (
		<div>
			{isShown ? (
				<div className={styles.moduleContainer}>
					<p className={styles.moduleText}> Are you sure? </p>
					<div className={styles.moduleButtons}>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onDelete();
								toggleModule();
							}}
							className={styles.confirmButton}
						>
							Delete
						</button>
						<button onClick={toggleModule} className={styles.rejectButton}>
							Cancel
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
//adding nested groups: studyGroup > StudyItems >  studyItem
