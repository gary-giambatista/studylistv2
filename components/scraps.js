//initial app
// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

//render function BROKEN AF
const render = useCallback(() => {
	return (renderedStudyList = studyItems.map((singleStudyItem, index) => (
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
			<button onClick={() => removeStudyItem(index)}> Remove Item </button>
		</div>
	)));
}, [studyItems]);

//add function without the function Jake Made
const addStudyList = () => {
	setFormData((prevStudyList) => {
		return [
			...prevStudyList,
			{
				id: prevStudyList[formData.length - 1].id++,
				created_at: "",
				is_open: false,
				group_name: "",
				group_link: "",
				group_desc: "",
				user_id: null,
			},
		];
	});
};

//old update input(works for objects)
function updateInput(event) {
	setStudyItems((prevFormData) => {
		return {
			...prevFormData,
			[event.target.name]: event.target.value,
		};
	});
}
