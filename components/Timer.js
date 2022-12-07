import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "../styles/Timer.module.css";

export default function Timer() {
	const [on, setOn] = useState(false);
	const [key, setKey] = useState(0);

	const timeDisplay = ({ remainingTime }) => {
		const minutes = Math.floor(remainingTime / 60);
		const seconds = remainingTime % 60;
		{
			seconds < 10 ? (seconds = `0${seconds}`) : seconds;
		}
		return `${minutes}:${seconds}`;
	};

	return (
		<div className={styles.timerContainer}>
			<CountdownCircleTimer
				key={key}
				size={50}
				strokeWidth={4}
				isPlaying={on}
				duration={1500}
				colors="#1da1f2"
			>
				{timeDisplay}
			</CountdownCircleTimer>
			<button
				className={styles.button}
				onClick={() => setOn((prevOn) => !prevOn)}
			>
				{on ? "Pause" : "Start"}
			</button>
			<button
				className={styles.button}
				onClick={() => setKey((prevKey) => prevKey + 1)}
			>
				Restart
			</button>
		</div>
	);
}
