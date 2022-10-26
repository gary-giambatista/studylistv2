import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

import { fileURLToPath } from "url";
import Navbar from "../Components/Navbar";
import StudyItem from "../Components/StudyItem.js";
//import supabase from "../utils/supabase.js";

let renderedStudyList = null;

export default function Home({ StudyList }, props) {
	//supabase auth imports
	const session = useSession();
	const supabase = useSupabaseClient();
	//array of study items, saved as objects for now
	const [studyItemComponent, setStudyItemComponent] = React.useState([{}]);
	//**index functions**
	//generates a new <StudyItem/> div for every studyItemComponent in state
	const render = useCallback(() => {
		return (renderedStudyList = studyItemComponent.map(
			(singleStudyItem, index) => (
				<div key={index}>
					<StudyItem
						index={index}
						studyItemComponent={studyItemComponent}
						setStudyItemComponent={setStudyItemComponent}
						removeStudyItem={removeStudyItem}
					/>
					<button onClick={() => removeStudyItem(index)}> Remove Item </button>
				</div>
			)
		));
	}, [studyItemComponent]);
	//adds a study item and re-renders the page with render() mapping
	const addStudyItem = () => {
		setStudyItemComponent([...studyItemComponent, { studyItem: 0 }]);
		render();
	};

	//remove a study item and re-render the page with render(mapping)
	const removeStudyItem = (index) => {
		const list = [...studyItemComponent];
		list.splice(index, 1);
		setStudyItemComponent(list);
		console.log("removed");
		render();
	};
	// const isFirstRender = useRef(true);
	// useEffect(() => {
	// 	if (isFirstRender.current) {
	// 		isFirstRender.current = false;
	// 		return; // 👈️ return early if first render
	// 	}
	// 	render();
	// }, [studyItemComponent]);
	useEffect(() => {
		console.log("study item component:" + JSON.stringify(studyItemComponent));
	}, [studyItemComponent]);

	//1.\\ checks to see if authenticated, then renders the index page
	return (
		<div className="container" style={{ padding: "50px 0 100px 0" }}>
			{!session ? (
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					theme="dark"
				/>
			) : (
				<div session={session}>
					<header>
						<Navbar />
					</header>

					{renderedStudyList ? <div>{renderedStudyList}</div> : null}

					<hr></hr>
					<button onClick={addStudyItem}>Add Study Item</button>
				</div>
			)}
		</div>
	);
}

// what is happening to the index and how is the array not maintaining equality?
// move the map function to <StudyItem/> and pass the function add study item there
