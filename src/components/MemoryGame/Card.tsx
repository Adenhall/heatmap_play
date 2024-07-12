import React from "react";

interface CardProps {
	item: {
		id: number;
		name: string;
		matched: boolean;
		img: string;
	};
	handleSelectedCards: (item: { id: number; name: string, matched: boolean, img: string }) => void;
	toggled: boolean;
	stopflip: boolean;
}

const Card: React.FC<CardProps> = ({ item, handleSelectedCards, toggled, stopflip }) => {
	return (
		<div className="item">
			<div className={toggled ? "toggled" : ""}>
				<img className="face" src={item.img} alt="face" />
				<div className="back" onClick={() => !stopflip && handleSelectedCards(item)}>
					{" "}
				</div>
			</div>
		</div>
	);
};

export default Card;
