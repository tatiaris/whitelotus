import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@geist-ui/react';
import { addItemToCard, getDiscountedPrice } from '../Helper';
import GPayButton from '../payment/GPayButton';

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
        {item.discount > 0 && <div className="item-card-discount-tag">{item.discount}% off!</div>}
        <div className="item-card-img-container">
          <img className="item-card-img" src={item.picture} alt="" />
        </div>
        <div className="item-card-details-container">
          <div style={{ height: '100px', display: 'flex' }}>
            <div style={{ width: '210px' }}>
              <a href="#"><h4 className="item-card-title">{item.title}</h4></a>
              <span>{item.company}</span>
              <br />
              <i>{item.quantity > 0 ? <span style={{ color: '#666' }}>In stock</span> : <span style={{ color: 'red' }}>Out of stock</span>}</i>
            </div>
            <div style={{ width: '40px', textAlign: 'right' }}>
              {item.discount > 0 ? (
                <>
                  <span style={{ color: 'red', textDecoration: 'line-through' }}>${item.price}</span>
                  <br />
                  <span style={{ color: '#666' }}>${getDiscountedPrice(item.price, item.discount)}</span>
                </>
              ) : (
                <span style={{ color: '#666' }}>${item.price}</span>
              )}
            </div>
          </div>
          <div className="cart-pay-btn-container">
            {item.quantity > 0 ? (
              <>
                <Button onClick={() => addItemToCard(item._id)} size="small" style={{ width: '100%' }}>
                  Add to cart
                </Button>
                <GPayButton totalPrice={getDiscountedPrice(item.price, item.discount)} />
              </>
            ) : (
              <>
                <Button disabled size="small" style={{ width: '100%' }}>
                  Add to cart
                </Button>
                <Button size="small" style={{ width: '100%' }}>
                  Set reminder
                </Button>
              </>
            )}
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
