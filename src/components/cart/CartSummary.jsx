import React from "react";
import CartItem from "../CartItem";
import EmptyCart from "../EmptyCart";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-lg mx-auto">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={removeFromCart} />
      ))}
      <div className="flex justify-between mt-4">
        <strong>Total:</strong>
        <span>₱{getTotalPrice().toFixed(2)}</span>
      </div>
      <Link
        to="/checkout"
        className="bg-green-500 text-white mt-4 block text-center py-2 rounded hover:bg-green-600"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
