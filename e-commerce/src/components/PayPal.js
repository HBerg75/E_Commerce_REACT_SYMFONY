import React, { useRef, useEffect } from "react";

export default function Paypal({totalPrice}) {
  const paypal = useRef();
  useEffect(() => {
    let finalPrice = totalPrice;
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "EUR",
                  value: finalPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
        },
        onError: (err) => {
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}