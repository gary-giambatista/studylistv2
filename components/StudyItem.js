import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"; //SupaBase user auth
import * as React from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "../styles/StudyItems.module.css";
import ConfirmDelete from "./ConfirmDelete.js";

export default function StudyItem({
	studyItem,
	onDelete,
	fetchStudyItems,
	toggleModule,
}) {
	const supabase = useSupabaseClient();

	const [isOpen, setIsOpen] = React.useState(studyItem.is_open);
	const [itemName, setItemName] = React.useState(studyItem.item_name);
	const [groupLink, setGroupLink] = React.useState(studyItem.group_link);
	const [groupDesc, setGroupDesc] = React.useState(studyItem.group_desc);
	//state for confirmation of deleting an item
	const [isShown, setIsShown] = React.useState(false);

	const toggle = async () => {
		try {
			const { data, error } = await supabase
				.from("StudyListComponents")
				.update({ is_open: !isOpen })
				.eq("id", studyItem.id)
				.select()
				.single();
			if (error) {
				throw new Error(error);
			}
			setIsOpen(data.is_open);
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
			if (name === "item_name") {
				setItemName(input_text);
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
							isOpen ? styles.toggleCloseButton : styles.toggleOpenButton
						}
					>
						{isOpen ? "Close" : "Open"}
					</button>
					<form onSubmit={(e) => e.preventDefault()}>
						<DebounceInput
							className={styles.studyItemName}
							name="item_name"
							types="text"
							placeholder="Create a Study Item"
							minLength={1}
							debounceTimeout={500}
							onChange={(e) => updateText("item_name", e.target.value)}
							value={itemName}
						/>
					</form>
				</div>

				{isOpen ? (
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
