import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { LayoutGroup, motion } from "framer-motion";
import * as React from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "../styles/StudyGroup.module.css";
import ConfirmDelete from "./ConfirmDelete";
import StudyItems from "./StudyItems.js";

export default function StudyGroup({ studyGroups, setStudyGroups }) {
	//SupaBase user auth
	const supabase = useSupabaseClient();
	const user = useUser();

	const addStudyGroup = async () => {
		let { data: study_group, error } = await supabase
			.from("StudyGroups")
			.insert({ user_id: user.id })
			.select()
			.single();
		if (error) console.log("error", error);
		else console.log(JSON.stringify(study_group));
		setStudyGroups([...studyGroups, study_group]);
	};

	const deleteStudyGroup = async (id) => {
		try {
			await supabase.from("StudyListComponents").delete().eq("group_id", id);

			await supabase.from("StudyGroups").delete().eq("id", id);
			setStudyGroups(studyGroups.filter((studyGroup) => studyGroup.id != id));
		} catch (error) {
			console.log("error", error);
		}
	};

	//UpdateText StudyGroup
	const updateText = async (studyGroup, input_text) => {
		try {
			const { data, error } = await supabase
				.from("StudyGroups")
				.update({ group_name: input_text })
				.eq("id", studyGroup.id);

			let { data: study_groups, error2 } = await supabase
				.from("StudyGroups")
				.select("*")
				.order("id", true);
			if (error) {
				throw new Error(error);
			}
			setStudyGroups(study_groups);
		} catch (error) {
			console.log("error", error);
		}
	};

	//toggle open StudyGroup
	const toggle = async (studyGroup) => {
		try {
			const { data, error } = await supabase
				.from("StudyGroups")
				.update({ is_open: !studyGroup.is_open })
				.eq("id", studyGroup.id)
				.select()
				.single();
			if (error) {
				throw new Error(error);
			}
			const newStudyGroups = studyGroups.map((obj) => {
				if (obj.id === studyGroup.id) {
					return data;
				}
				return obj;
			});
			setStudyGroups(newStudyGroups);
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<LayoutGroup>
			{studyGroups?.map((studyGroup) => (
				<div
					className={
						studyGroup.is_open
							? styles.studyGroupContainerOpen
							: styles.studyGroupContainerClosed
					}
					key={studyGroup.created_at}
				>
					<motion.div
						layout
						initial={{
							opacity: 0,
						}}
						animate={{
							y: [-10, -8, -6, -4, -2, 0],
							opacity: 1,
						}}
						transition={{
							duration: 0.6,
						}}
						className={styles.groupButtonAndInput}
					>
						<button
							className={
								studyGroup.is_open
									? styles.toggleCloseButton
									: styles.toggleOpenButton
							}
							onClick={() => toggle(studyGroup)}
						>
							{studyGroup.is_open ? "Close Group" : "Open Group"}
						</button>
						<form onSubmit={(e) => e.preventDefault()}>
							<DebounceInput
								className={styles.groupName}
								name="group_name"
								types="text"
								placeholder="Study Group Name"
								minLength={1}
								debounceTimeout={500}
								onChange={(e) => updateText(studyGroup, e.target.value)}
								value={studyGroup.group_name}
							/>
						</form>
					</motion.div>

					{studyGroup.is_open ? (
						<motion.div
							layout
							initial={{
								y: -50,
								opacity: 0,
							}}
							animate={{
								y: 0,
								opacity: 1,
							}}
							transition={{
								duration: 0.6,
							}}
						>
							<ConfirmDelete
								className={styles.testing}
								buttonText={"Delete Group"}
								onDelete={() => deleteStudyGroup(studyGroup.id)}
							/>
							<StudyItems
								key={studyGroup.created_at}
								studyGroupId={studyGroup.id}
								onDeleteGroup={() => deleteStudyGroup(studyGroup.id)}
							/>
						</motion.div>
					) : null}
				</div>
			))}

			<motion.div
				layout
				initial={{
					opacity: 0,
				}}
				animate={{
					y: [-10, -8, -6, -4, -2, 0],
					opacity: 1,
				}}
				transition={{
					duration: 0.6,
				}}
			>
				<hr className={styles.addGroupMarginHR}></hr>
				<button className={styles.addButton} onClick={addStudyGroup}>
					Create Study Group
				</button>
			</motion.div>
		</LayoutGroup>
	);
}
