import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footerContainer}>
			{/* <hr className={styles.bottomLine}></hr> */}
			<ul className={styles.footerText}>
				<li>Desgined by Gary Giambatista</li>
				<li>Gary.Giambatista@gmail.com</li>
				<li> Copyright © BBBB5 2022</li>
			</ul>
		</footer>
	);
}
