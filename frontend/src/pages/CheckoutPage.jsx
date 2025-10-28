import React from "react";
import CheckOutForm from "../components/CheckOutForm";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../hooks/useCart";
import orderService from "../services/orderService";

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();

  const handleOrderSubmit = async (formData) => {
    await orderService.placeOrder({ ...formData, items: cart });
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      <CheckOutForm onSubmit={handleOrderSubmit} />
      <OrderSummary total={getTotalPrice()} />
    </div>
  );
};

export default CheckoutPage;
