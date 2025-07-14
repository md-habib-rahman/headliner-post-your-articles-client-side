import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

// import '../styles/common.css';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if (event.target.paymentPlan.value === "---Select Plan---") {
      setError("Please select plan to proceed!");
      return;
    }
    // console.log()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  const paymentPlan = [
    { id: 1, value: "1 Minute", price: 0.99 },
    { id: 2, value: "5 Days", price: 19.99 },
    { id: 3, value: "10 Days", price: 29.99 },
  ];
  const handlePlanChange = (e) => {
    if (e.target.value !== "---Select Plan---") {
      setPlan(e.target.value);
    } else {
      setPlan(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-base-300 p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="p-2 border rounded border-primary" />
      <select
        name="paymentPlan"
        className="w-full rounded   shadow-md p-2 border border-primary"
        onChange={handlePlanChange}
      >
        <option>---Select Plan---</option>
        {paymentPlan.map((plan) => (
          <option key={plan.id} value={plan.price}>
            {plan.value}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={!stripe}
        className="btn btn-primary w-full"
      >
        Pay ${plan}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

const stripPromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Payment = () => {
  return (
    <Elements stripe={stripPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
