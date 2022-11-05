import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import * as React from "react";
import styles from "../styles/StudyItems.module.css";
import StudyItem from "./StudyItem";

export default function StudyItems({ studyGroupId }) {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [studyItems, setStudyItems] = React.useState(fetchStudyItems, []);

	React.useEffect(() => {
		fetchStudyItems();
	}, []);

	const fetchStudyItems = async () => {
		let { data: study_item, error } = await supabase
			.from("StudyListComponents")
			.select("*")
			.eq("group_id", studyGroupId)
			.order("id", true);
		if (error) console.log("error", error);
		else setStudyItems(study_item);
	};

	const addStudyItem = async (studyGroupId) => {
		console.log(studyGroupId);
		let { data: study_item, error } = await supabase
			.from("StudyListComponents")
			.insert({ user_id: user.id, group_id: studyGroupId })
			.select()
			.single();
		if (error) console.log("error", error);
		else setStudyItems([...studyItems, study_item]);
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
			<button
				className={styles.addButton}
				onClick={() => addStudyItem(studyGroupId)}
			>
				Create Study Item
			</button>
		</div>
	);
}
