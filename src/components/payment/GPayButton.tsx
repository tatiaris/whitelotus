import React from 'react';
import GooglePayButton from '@google-pay/button-react';
import PropTypes from 'prop-types';
import { useToasts } from '@geist-ui/react';

/**
 * Google Pay Button component
 */
interface GPayButtonInterface {
  totalPrice: number;
}
export const GPayButton: React.FC<GPayButtonInterface> = (props) => {
  const [, setToast] = useToasts();

  return (
    <GooglePayButton
      buttonSizeMode="fill"
      environment={process.env.ENVIRONMENT == 'production' ? 'PRODUCTION' : 'TEST'}
      onError={() => setToast({text: 'Payment did not go through.', type: 'error'})}
      onCancel={() => setToast({text: 'Payment cancelled.', type: 'error'})}
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId'
              }
            }
          }
        ],
        merchantInfo: {
          merchantId: process.env.GOOGLE_PAY_MERCHANT_ID,
          merchantName: process.env.GOOGLE_PAY_MERCHANT_NAME
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: props.totalPrice.toString(),
          currencyCode: 'USD',
          countryCode: 'US'
        }
      }}
      onLoadPaymentData={(paymentRequest) => {
        console.log('load payment data', paymentRequest);
      }}
    />
  );
};

GPayButton.propTypes = {
  totalPrice: PropTypes.number.isRequired
};

export default GPayButton;
