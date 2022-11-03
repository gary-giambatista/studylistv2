import React from "react";
import styles from "../styles/StudyItems.module.css";

export default function ConfirmDelete({ onDelete, buttonText }) {
	const [isShown, setIsShown] = React.useState(false);

	return (
		<div>
			{!isShown ? (
				<button
					className={styles.removeButton}
					onClick={() => setIsShown(!isShown)}
				>
					{buttonText}
				</button>
			) : null}
			{isShown ? (
				<div className={styles.moduleContainer}>
					<p className={styles.moduleText}> Are you sure? </p>
					<div className={styles.moduleButtons}>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onDelete();
								setIsShown(!isShown);
							}}
							className={styles.confirmButton}
						>
							Delete
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setIsShown(!isShown);
							}}
							className={styles.rejectButton}
						>
							Cancel
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
