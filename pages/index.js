import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import { fileURLToPath } from "url";
import Navbar from "../Components/Navbar";
import StudyItem from "../Components/StudyItem.js";
//import supabase from "../utils/supabase.js";

let renderedStudyList = null;

export default function Home({ StudyList }, props) {
	const [studyItemComponent, setStudyItemComponent] = React.useState([
		{ studyItem: 0 },
	]);

	let render = () => {
		return (renderedStudyList = studyItemComponent.map(
			(singleStudyItem, index) => (
				<div key={index}>
					<StudyItem
						index={index}
						studyItemComponent={studyItemComponent}
						setStudyItemComponent={setStudyItemComponent}
					/>
				</div>
			)
		));
	};
	const addStudyItem = () => {
		setStudyItemComponent([...studyItemComponent, { studyItem: 0 }]);
		render();
	};
	useEffect(() => {
		console.log("study item component:" + studyItemComponent);
	}, [studyItemComponent]);

	return (
		<div>
			<header>
				<Navbar />
			</header>

			{renderedStudyList ? <div>{renderedStudyList}</div> : null}

			<hr></hr>
			<button onClick={addStudyItem}>Add Study Item</button>
		</div>
	);
}
