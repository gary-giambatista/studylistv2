import { motion } from "framer-motion";
import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
	return (
		<motion.footer
			layout="position"
			initial={{
				y: -50,
				opacitx: 0,
			}}
			animate={{
				y: 0,
				opacity: 1,
			}}
			transition={{
				duration: 0.6,
			}}
			className={styles.footerContainer}
		>
			{/* <hr className={styles.bottomLine}></hr> */}
			<ul className={styles.footerText}>
				<li>Desgined by Gary Giambatista</li>
				<li>Gary.Giambatista@gmail.com</li>
				<li>Copyright © BBBB5 2022</li>
			</ul>
		</motion.footer>
	);
}
