import React from "react";

const OrderSummary = ({ total }) => (
  <div className="border p-4 rounded-md shadow-md">
    <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
    <p className="text-gray-700">Total: ₱{total.toFixed(2)}</p>
  </div>
);

export default OrderSummary;
