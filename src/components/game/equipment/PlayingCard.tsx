import React from 'react';
import PropTypes from 'prop-types';

/**
 * ItemCard component
 */
interface PlayingCardData {
  value: string;
  suit: "hearts" | "spades" | "diamonds" | "clubs";
}
interface PlayingCardProps {
  data: PlayingCardData;
}
export const PlayingCard: React.FC<PlayingCardProps> = (props) => {
  const card = props.data;
  return (
    <div className={`playing-card ${card.suit}`}>
      <div className="card-value">{card.value}</div>
    </div>
  );
};

PlayingCard.propTypes = {
  data: PropTypes.any.isRequired
};

export default PlayingCard;
