import { useRouter } from 'next/router';

export const sum = (a: number, b: number): number => {
  return a + b;
};

export const sendNotificationToast = (setToastFunction, message: string, notificationType: string): void => {
  setToastFunction({
    text: message,
    type: notificationType
  });
};

export const navigatePath = (path: string): void => {
  location.href = path;
};

export const getInitialPath = () => {
  const router = useRouter();
  return router.route.split('/')[1];
};

export const getDiscountedPrice = (price: number, percentDiscount: number): number => Math.ceil(price - (percentDiscount / 100) * price);

export const addItemToCard = (itemdId: string): void => {
  console.log(`adding item: ${itemdId} to the cart`);
};
