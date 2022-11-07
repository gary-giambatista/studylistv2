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

// backend is anything that isn't the client - client displays and does little processing, backend is where data is contained, processed and served out
// 1. create database - postgres
// 2. create backend - middleware
// 3. create API that receives a request and figures out what to do with it
// 4. create database functions that handle a api request, and return

export function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = React.useState(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [value]);

	return debouncedValue;
}

//lodash for debouncing in react
//var debounce = require("lodash.debounce");
//const debouncedChangeHandler = useMemo(() => debounce(updateText, 300), []);

//collapsible react package
//import Collapsible from "react-collapsible";
{
	/* <Collapsible trigger="Start here">
	<StudyItems />
</Collapsible> */
}

//chevrons
// import Image from "next/image";
// import ChevronDown from "../public/chevron-down.svg";
// import Chevron from "../public/chevron.svg";
// {studyGroup.is_open ? (
// 	<Image src={Chevron} alt="Open" />
// ) : (
// 	<Image src={ChevronDown} alt="Close" />
// )}

//using a spinner on loading with boolean state
// 2 methods
import ClipLoader from "react-spinners/ClipLoader";
const [spinOpen, setSpinOpen] = React.useState(false);
<ClipLoader loading={spinOpen} size={35} />
{spinOpen ? <ClipLoader> : <div>false</div>}
	//toggle open StudyGroup
	const toggle = async (studyGroup) => {
		setSpinOpen(true);
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
			setSpinOpen(false);
			setStudyGroups(newStudyGroups);
		} catch (error) {
			console.log("error", error);
		}
	};