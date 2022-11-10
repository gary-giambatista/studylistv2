import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import * as React from "react";
import StudyGroup from "./StudyGroup.js";

export default function Fetcher() {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [studyGroups, setStudyGroups] = React.useState(fetchStudyGroups, []);

	React.useEffect(() => {
		fetchStudyGroups();
	}, []);

	const fetchStudyGroups = async () => {
		let { data: study_groups, error } = await supabase
			.from("StudyGroups")
			.select("*")
			.order("id", true);
		if (error) console.log("error", error);
		else setStudyGroups(study_groups);
	};

	return (
		<StudyGroup
			studyGroups={studyGroups}
			setStudyGroups={setStudyGroups}
			fetchStudyGroups={fetchStudyGroups}
		/>
	);
}
