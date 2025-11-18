const orderService = {
  async placeOrder(orderData) {
    console.log("📦 Sending order to backend...", orderData);
    // Simulate API delay
    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 1000)
    );
  },
};

export default orderService;
