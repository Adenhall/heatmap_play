import React, { useState, useEffect } from "react";
import Data from "./Data";
import Card from "./Card";

interface CardType {
	id: number;
	name: string;
	matched: boolean;
  img: string;
}

const GameBoard: React.FC = () => {
	const [cardsArray, setCardsArray] = useState<CardType[]>([]);
	const [moves, setMoves] = useState<number>(0);
	const [firstCard, setFirstCard] = useState<CardType | null>(null);
	const [secondCard, setSecondCard] = useState<CardType | null>(null);
	const [stopFlip, setStopFlip] = useState<boolean>(false);
	const [won, setWon] = useState<number>(0);

	const NewGame = () => {
		setTimeout(() => {
			const randomOrderArray = Data.sort(() => 0.5 - Math.random());
			setCardsArray(randomOrderArray);
			setMoves(0);
			setFirstCard(null);
			setSecondCard(null);
			setWon(0);
		}, 1200);
	};

	const handleSelectedCards = (item: CardType) => {
		if (firstCard !== null && firstCard.id !== item.id) {
			setSecondCard(item);
		} else {
			setFirstCard(item);
		}
	};

	useEffect(() => {
		if (firstCard && secondCard) {
			setStopFlip(true);
			if (firstCard.name === secondCard.name) {
				setCardsArray((prevArray) =>
					prevArray.map((unit) =>
						unit.name === firstCard.name ? { ...unit, matched: true } : unit
					)
				);
				setWon((prevVal) => prevVal + 1);
				removeSelection();
			} else {
				setTimeout(() => {
					removeSelection();
				}, 1000);
			}
		}
	}, [firstCard, secondCard]);

	const removeSelection = () => {
		setFirstCard(null);
		setSecondCard(null);
		setStopFlip(false);
		setMoves((prevValue) => prevValue + 1);
	};

	useEffect(() => {
		NewGame();
	}, []);

	return (
		<div className="container">
			<div className="header">
				<h1>Memory Game</h1>
			</div>
			<div className="board">
				{cardsArray.map((item) => (
					<Card
						item={item}
						key={item.id}
						handleSelectedCards={handleSelectedCards}
						toggled={item === firstCard || item === secondCard || item.matched}
						stopflip={stopFlip}
					/>
				))}
			</div>

			{won !== 6 ? (
				<div className="comments">Moves : {moves}</div>
			) : (
				<div className="comments">You Won in {moves} moves!</div>
			)}
			<button className="button" onClick={NewGame}>
				New Game
			</button>
		</div>
	);
};

export default GameBoard;
