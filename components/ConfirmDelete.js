import styles from "../styles/StudyItems.module.css";

export default function ConfirmDelete({ onDelete, isShown, toggleModule }) {
	return (
		<div>
			{isShown ? (
				<div className={styles.moduleContainer}>
					<p className={styles.moduleText}> Are you sure? </p>
					<div className={styles.moduleButtons}>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onDelete();
								toggleModule();
							}}
							className={styles.confirmButton}
						>
							Delete
						</button>
						<button onClick={toggleModule} className={styles.rejectButton}>
							Cancel
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
