import { motion } from "framer-motion";
import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footerContainer}>
			<motion.div
				initial={{
					y: -50,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					duration: 0.6,
				}}
			>
				<ul className={styles.footerText}>
					<li>Desgined by Gary Giambatista</li>
					<li>Gary.Giambatista@gmail.com</li>
					<li>Copyright © Gary Giambatista 2022</li>
				</ul>
			</motion.div>
		</footer>
	);
}
