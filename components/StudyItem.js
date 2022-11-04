import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import * as React from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "../styles/StudyItem.module.css";
import ConfirmDelete from "./ConfirmDelete.js";

export default function StudyItem({ studyItem, onDelete }) {
	const supabase = useSupabaseClient();

	const [isOpen, setIsOpen] = React.useState(studyItem.is_open);
	const [itemName, setItemName] = React.useState(studyItem.item_name);
	const [groupLink, setGroupLink] = React.useState(studyItem.group_link);
	const [groupDesc, setGroupDesc] = React.useState(studyItem.group_desc);

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
							placeholder="Study Item Name"
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
									placeholder="Paste a link here"
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
						<ConfirmDelete
							className={styles.testing}
							buttonText={"Remove Item"}
							onDelete={onDelete}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}
