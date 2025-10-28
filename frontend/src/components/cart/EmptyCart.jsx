import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => (
  <div className="text-center py-10">
    <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
    <Link
      to="/"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Go Shopping
    </Link>
  </div>
);

export default EmptyCart;
