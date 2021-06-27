import React from 'react';
import { Page } from '@geist-ui/react';
import ItemCard from '../components/shopping/ItemCard';

const Shop = ({ itemsArray }): React.ReactNode => {
  return (
    <>
      <Page>
        <div className="flex-wrap-container">
          {itemsArray.map((item, i) => {
            return <ItemCard key={`shop-item-${i}`} data={item} />;
          })}
        </div>
      </Page>
    </>
  );
};

Shop.getInitialProps = async () => {
  const baseUrl = process.env.ENVIRONMENT == 'test' ? 'http://localhost:3000' : 'https://rt-template.vercel.app';
  const res = await fetch(`${baseUrl}/api/rest`);
  const json = await res.json();
  return { itemsArray: json.content };
};

export default Shop;
