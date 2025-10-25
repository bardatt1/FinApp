const cartService = {
  getCart: () => JSON.parse(localStorage.getItem("cart")) || [],
  saveCart: (cart) => localStorage.setItem("cart", JSON.stringify(cart)),
};

export default cartService;
