import React, { useState } from 'react';
import { PayNow, loadStripe } from 'react-stripe-js';

export const PaymentModel = () => {
  const stripe = loadStripe("{publishable key}")

  const [clientSecret, setClientSecret] = useState<string>("");

  const createOrderAndGetPaymentIntent = () => {
    // in this function we will store the order info and get a payment intent back from server.
    if (!clientSecret) {
      fetch("{backendurl}", {
        method: "POST",
        headers: { "Content-Type": "application/json",  Authorization: "Bearer {token}", },
        body: JSON.stringify({
          "coach": "646367a07fd52c7eaaaae9af",
          "noOfSessions": 3
        }),
      }).then((res) => res.json()).then((data) => setClientSecret(data.data.clientSecret));
    }
  }
  console.log(clientSecret)
return <PayNow
      title='Click To Pay'
      successMessage='payment done,creating order please wait....'
      stripe={stripe}
      clientSecret={clientSecret}
      onClick={() => {
        // todo: other input field validation (like name,shipping address,etc)
        // todo: create the order and store into database by setting payment-status to pending
        createOrderAndGetPaymentIntent()
      }}
      onPaymentSuccess={() => {
        console.log("wow, payment done. the webhook will be called, so we will update order info in webhook and make the payment-status pending to paid.");
      }}
    />
}