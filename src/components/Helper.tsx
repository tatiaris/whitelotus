import { useRouter } from 'next/router';

export const sum = (a: number, b: number): number => {
  return a + b;
};

const launchSuccessToast = (setToast, msg) => setToast({ text: msg, type: 'warning', delay: 3000 });
const launchFailToast = (setToast, msg) => setToast({ text: msg, type: 'error', delay: 3000 });
/**
 * sends a user a positive/negative notification
 * @param  {bool} intent good or bad
 * @param {string} msg message to send as a notification
 */
const sendNotification = (setToast, intent, msg) => {
  console.log('sending notification');

  if (intent) launchSuccessToast(setToast, msg);
  else launchFailToast(setToast, msg);
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

export const addToDatabase = (objectType: string, newObject: object, toastFunction) => {
  fetch(`/api/${objectType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newObject: newObject })
  })
    .then((response) => response.json())
    .then((data) => {
      sendNotification(toastFunction, data.success, data.message);
    })
    .catch((error) => {
      console.error('Error:', error);
      sendNotification(toastFunction, false, "Could not add to database");
    });
}