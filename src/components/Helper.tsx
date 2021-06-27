import { useRouter } from 'next/router';

export const sum = (a, b) => {
  return a + b;
}

export const sendNotificationToast = (setToastFunction, message, notificationType) => {
  setToastFunction({
    text: message,
    type: notificationType,
  })
}

export const navigatePath = path => location.href = path;

export const getInitialPath = () => {
  const router = useRouter();
  return router.route.split('/')[1];
}

export const getDiscountedPrice = (price, percentDiscount) => Math.ceil(price - (percentDiscount/100)*price);

export const addItemToCard = itemdId => {
  console.log(`adding item: ${itemdId} to the cart`);
}