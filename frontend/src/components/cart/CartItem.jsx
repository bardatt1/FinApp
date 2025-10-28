import React from "react";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="border p-3 flex justify-between items-center rounded-lg shadow-sm mb-3">
      <div>
        <h3 className="font-bold">{item.name}</h3>
        <p>₱{item.price.toFixed(2)}</p>
        <p>Qty: {item.quantity}</p>
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
