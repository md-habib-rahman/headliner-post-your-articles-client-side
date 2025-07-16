import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

// import '../styles/common.css';

const PaymentForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [subscriptionDuration, setSubscriptionDuration] = useState(null);
  const navigate = useNavigate();

  // console.log(user);
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

    //create payment intent
    const res = await axiosInstance.post("/create-payment-intent", {
      amountInCents,
    });

    const clientSecret = res.data.clientSecret;
    console.log(clientSecret);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    console.log(result);
    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment successfull! Enjoy Premium Service...",
          showConfirmButton: false,
          timer: 1500,
        });
        const now = new Date();
        const premiumTaken = now.toISOString();
        const email = user?.email;
        const userActivation = await axiosInstance.patch(
          `/user/active-subscription/${email}`,
          { premiumTaken, subscriptionDuration }
        );

        navigate("/");
        console.log(userActivation.data)
        setError(null);
      } else {
        setError(`Payment status: ${result.paymentIntent.status}`);
      }
    }
  };
  const paymentPlan = [
    { id: 1, value: "1 Minute", price: 0.99, durationInSeconds: 60 },
    { id: 2, value: "5 Days", price: 19.99, durationInSeconds: 432000 },
    { id: 3, value: "10 Days", price: 29.99, durationInSeconds: 864000 },
  ];

  const handlePlanChange = (e) => {
    if (e.target.value !== "---Select Plan---") {
      setPlan(e.target.value);
      const duration = paymentPlan.find(
        (item) => item.price.toString() === e.target.value
      );
      setSubscriptionDuration(duration.durationInSeconds);
      //   console.log(duration.durationInSeconds);
    } else {
      setPlan(null);
      setSubscriptionDuration(null);
    }
  };
  //   console.log(plan);
  //   console.log(subscriptionDuration);
  const amount = parseFloat(plan) * 100;
  const amountInCents = Math.round(amount);

  //   console.log(Math.round(amountInCents));

  return (
    <div className="mb-12">
      <h3 className="text-center mb-8 text-2xl font-bold md:text-3xl font-montserrat text-primary">
        Choose your plan
      </h3>
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
          {plan ? `Pay $${plan}` : "Pay"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

const stripPromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  return (
    <Elements stripe={stripPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
