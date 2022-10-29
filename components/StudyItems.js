import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
//import supabase from "../utils/supabase.js";

import Home from "../pages/_app.js";

let renderedStudyList = null;

export default function StudyItems(props) {
	const index = props.index;

	//form state (for each <StudyItem/>)
	function studyItemMaker(id) {
		return {
			id: id,
			created_at: "",
			is_open: false,
			group_name: "",
			group_link: "",
			group_desc: "",
			user_id: null,
		};
	}
	const [studyItems, setStudyItems] = React.useState([studyItemMaker(0)]);

	//state functions
	const addStudyItems = () => {
		setStudyItems((prevStudyList) => {
			return [...prevStudyList, [studyItemMaker(prevStudyList.length)]];
		});
	};
	//remove a study item by index
	function removeStudyItem(index) {
		const list = [...studyItems];
		console.log("list: " + JSON.stringify(list));
		list.splice(index, 1);
		setStudyItems(list);
		console.log("removed", +JSON.stringify(studyItems));
	}

	//todo Fix Update and Toggle OPEN functions
	const updateText = (event, index) => {
		const { name, value } = event.target;
		const list = [...studyItems];
		list[index][name] = value;
		setStudyItems(list);
	};

	const toggleOpen = () => {
		setStudyItems((prevFormData) => {
			return [...prevFormData, { is_open: !prevFormData.is_open }];
		});
	};

	//useEffect to only render on [dependency array]
	const isFirstRender = useRef(true);
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return; // 👈️ return early if first render
		}
		console.log("formData :" + JSON.stringify(studyItems));
	}, [studyItems]);

	return (
		<div>
			{
				(renderedStudyList = studyItems.map((singleStudyItem, index) => (
					<div key={index}>
						<div id={`studyGroupNumber${index}`}>
							<div className={styles.studyListHeaderContainer}>
								<button onClick={toggleOpen}>
									{studyItems.is_open ? "Close" : "Open"}
								</button>
								<form className={styles.studyGroupName}>
									<input
										name="group_name"
										types="text"
										placeholder="Create a Study Group"
										onChange={updateText}
										value={singleStudyItem.group_name}
									/>
								</form>
							</div>

							{studyItems.is_open ? (
								<div className={styles.studyListItemBody}>
									<form>
										<input
											className={styles.studyListItemBody}
											name="group_link"
											type="text"
											placeholder="Enter a link here"
											onChange={updateInput}
											value={singleStudyItem.group_link}
										/>
										<textarea
											name="group_desc"
											type="text"
											placeholder="Enter notes here"
											onChange={updateInput}
											value={singleStudyItem.group_desc}
										/>
									</form>
									<button onClick={() => removeStudyItem(index)}>
										{" "}
										Remove Item{" "}
									</button>
								</div>
							) : (
								<div></div>
							)}
						</div>
						<button onClick={() => removeStudyItem(index)}>
							{" "}
							Remove Item{" "}
						</button>
					</div>
				)))
			}
			<button onClick={addStudyItems}>RENDER</button>
		</div>
	);
}
