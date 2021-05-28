import React, { useState, useEffect } from "react";

function App() {
	const players = ["X", "O"];
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
	const [message, setMessage] = useState({ title: "", description: "" });
	const [modal, setModal] = useState(false);
	const [isReset, setReset] = useState(false);
	const [player, setPlayer] = useState(
		players[Math.floor(Math.random() * players.length)]
	);
	const resetBoard = () => {
		setPlayer(players[Math.floor(Math.random() * players.length)]);
		setReset(false);
		setBoard(["", "", "", "", "", "", "", "", ""]);
		setMessage({ title: "", description: "" });
	};
	const checkThisBox = (e) => {
		if (!checkForWinner()) {
			let newboard = [...board];
			if (newboard.every((e) => e !== "")) {
				toggleModal(
					"The Match is Tie",
					"From this Tic-Tac-Toe Game Both X & O players have same Memory and IQ capacity"
				);
				setReset(true);
				return false;
			} else if (newboard[e]) {
				toggleModal(
					"The Box is Already filled",
					`You cannot Rearrange the Box value. Because the Box is Already filled by ${board[e]}`
				);
				return false;
			} else {
				newboard[e] = player;
				setBoard(newboard);
				if (newboard.every((e) => e !== "")) {
					toggleModal(
						"The Match is Tie",
						"From this Tic-Tac-Toe Game Both X & O players have same Memory and IQ capacity"
					);
					setReset(true);
					return false;
				}
				if (!checkForWinner(newboard)) {
					switchPlayer();
					return false;
				} else {
					toggleModal(
						"Player " + player + " wins",
						"The Player " +
							player +
							" have some extra talents than their opponent. So he/her wins the match"
					);
					setReset(true);
					return false;
				}
			}
		} else {
			toggleModal(
				"Player " + player + " Already wins",
				"Reset this Board or Refresh this Page to play unlimited games and increase you skills"
			);
			setReset(true);
		}
	};
	const toggleModal = (title = "", description = "") => {
		setMessage({ title: title, description: description });
		setModal(!modal);
	};
	const checkForWinner = (newboard = board) => {
		let sequence = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let index = 0; index < sequence.length; index++) {
			if (
				newboard[sequence[index][0]] === newboard[sequence[index][1]] &&
				newboard[sequence[index][0]] === newboard[sequence[index][2]] &&
				newboard[sequence[index][0]] !== ""
			) {
				return true;
			}
		}
	};
	const switchPlayer = () => {
		setPlayer(player === "X" ? "O" : "X");
	};
	useEffect(() => {}, [board, player]);
	return (
		<>
			<div className='score'>Current Player : {player}</div>
			<div className='container'>
				<div className='board'>
					{board.map((e, i) => {
						let cName = "box ";
						if (e === "X") {
							cName = cName + "filledX";
						} else if (e === "O") {
							cName = cName + "filledO";
						}
						return (
							<div
								key={i}
								className={cName}
								onClick={() => {
									checkThisBox(i);
								}}
							>
								{e}
							</div>
						);
					})}
				</div>
				<div style={{ textAlign: "center" }}>
					<div
						className={isReset ? "resetBtn show" : "resetBtn"}
						onClick={resetBoard}
					>
						Reset Board
					</div>
				</div>
			</div>

			<div className={modal ? "modal show" : "modal"}>
				<h2>{message.title}</h2>
				<div className='content'>{message.description}</div>
				<div className='actions'>
					<button
						className='toggle-button'
						onClick={() => {
							toggleModal();
						}}
					>
						OK
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
