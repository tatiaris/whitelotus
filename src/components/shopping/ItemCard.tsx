import React from 'react';
import PropTypes from 'prop-types';
import { Text, Divider, Button } from '@geist-ui/react';

/**
 * ItemCard component
 */
interface ItemData {
  _id: string;
  index: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  picture: string;
  company: string;
  tags: Array<string>;
}
interface ItemCardProps {
  data: ItemData;
}
export const ItemCard: React.FC<ItemCardProps> = (props) => {
  const item = props.data;
  return (
    <>
      <div className="item-card">
        <div className="item-card-img-container">
          <img className="item-card-img" src={item.picture} alt="" />
        </div>
        <div className="item-card-details-container">
          <div style={{ height: "140px", display: "flex" }}>
            <div style={{ width: "210px" }}>
              <h4>{item.title}</h4>
              <span>{item.company}</span><br />
              {(item.quantity > 0) 
              ? <span style={{ color: "#666" }}>In stock</span> 
              : <span style={{ color: "red" }}>Out of stock</span>}
            </div>
            <div style={{ width: "40px", textAlign: "right" }}>
              {}
              <span style={{ color: "#666" }}>${item.price}</span>
            </div>
          </div>
          <div className="flex-center" style={{ height: "40px" }}>
            {item.quantity > 0
            ? <Button size="small" style={{ width: "100%" }}>Add to cart</Button>
            : <Button disabled size="small" style={{ width: "100%" }}>Add to cart</Button>}
          </div>
        </div>
      </div>
    </>
  );
};

ItemCard.propTypes = {
  data: PropTypes.any.isRequired
};

export default ItemCard;