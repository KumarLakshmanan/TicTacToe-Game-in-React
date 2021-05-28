import React, { useState, useEffect } from "react";

function App() {
	const players = ["X", "O"];
	const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
	const [classList, setClassList] = useState(["box ","box ","box ","box ","box ","box ","box ","box ","box "]);
	const [message, setMessage] = useState({ title: "", description: "" });
	const [modal, setModal] = useState(false);
	const [isReset, setReset] = useState(false);
	const [player, setPlayer] = useState(
		players[Math.floor(Math.random() * players.length)]
	);
	const resetBoard = () => {
		setPlayer(players[Math.floor(Math.random() * players.length)]);
		setReset(false);
		setClassList(["box ","box ","box ","box ","box ","box ","box ","box ","box "]);
		setModal(false);
		setBoard(["", "", "", "", "", "", "", "", ""]);
		setMessage({ title: "", description: "" });
	};
	const checkThisBox = (e) => {
		if (!checkForWinner(board)) {
			if (board[e]) {
				toggleModal(
					"The Box is Already filled",
					`You cannot Rearrange the Box value. Because the Box is Already filled by ${board[e]}`
				);
				return false;
			} else {
				board[e] = player;
				classList[e] = classList[e] + "filled" + player + " ";
				if (checkForWinner(board)) {
					toggleModal(
						"Player " + player + " wins",
						"The Player " +
							player +
							" have some extra talents than their opponent. So he/her wins the match"
					);
					setReset(true);
				} else if (board.every((e) => e !== "")) {
					toggleModal(
						"The Match is Tie",
						"From this Tic-Tac-Toe Game Both X & O players have same Memory and IQ capacity"
					);
					setReset(true);
				} else {
					setBoard(board);
					setClassList(classList);
					switchPlayer();
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
	const checkForWinner = () => {
		let sequence = [
			[[0, 1, 2], "horizontal "],
			[[3, 4, 5], "horizontal "],
			[[6, 7, 8], "horizontal "],
			[[0, 3, 6], "vertical "],
			[[1, 4, 7], "vertical "],
			[[2, 5, 8], "vertical "],
			[[0, 4, 8], "diagonal1 "],
			[[2, 4, 6], "diagonal2 "],
		];
		for (let index = 0; index < sequence.length; index++) {
			if (
				board[sequence[index][0][0]] === board[sequence[index][0][1]] &&
				board[sequence[index][0][0]] === board[sequence[index][0][2]] &&
				board[sequence[index][0][0]] !== ""
			) {
				classList[sequence[index][0][0]] =
					classList[sequence[index][0][0]] + sequence[index][1];
				classList[sequence[index][0][1]] =
					classList[sequence[index][0][1]] + sequence[index][1];
				classList[sequence[index][0][2]] =
					classList[sequence[index][0][2]] + sequence[index][1];
				setClassList(classList);
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
						let cName = classList[i];
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

			<div className={modal ? "showModal" : ""}>
				<div className='modal'>
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
			</div>
		</>
	);
}

export default App;
