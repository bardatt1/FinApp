import React from "react";
import CarSummary from "../components/CarSummary";

const CartPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
    <CarSummary />
  </div>
);

export default CartPage;
