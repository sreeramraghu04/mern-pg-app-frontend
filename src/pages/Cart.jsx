import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import axios from "axios";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  //! Remove item from cart
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  //! Calculate total price of cart items
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  //! Buy Now function
  const handleBuynow = async (amount) => {
    console.log("Amount:", amount); // must be a number

    try {
      const { data: keyData } = await axios.get("/api/v1/payment/get-key");
      const key = keyData.key;
      console.log("Key:", key);

      const { data: orderData } = await axios.post(
        "/api/v1/payment/payment-process",
        {
          amount,
        },
      );
      const { order } = orderData;
      console.log("Order:", order);

      //! Open Razorpay Options
      const options = {
        key: key, //* Replace with your Razorpay key_id
        amount: order.amount, //* Amount is in currency subunits.
        currency: "INR",
        name: "Payment-Gateway",
        description:
          "This project demonstrates secure online payments integration using a modern payment gateway.",
        order_id: order.id, //* This is the order_id created in the backend
        callback_url: "/api/v1/payment/payment-verification", //* Your success URL
        prefill: {
          name: "wafa raman",
          email: "wafaramann@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-blue-100">
      <h1 className="text-3xl font-bold text-center mb-8">Carts Page</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border p-3 mb-2 flex justify-between bg-blue-200 rounded"
            >
              <div>
                <p>{item.title}</p>
                <p>₹{item.price}/-</p>
              </div>

              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="font-semibold mt-4">Total: ₹{totalPrice}/-</h2>

          <button
            onClick={() => handleBuynow(totalPrice)}
            className="mt-3 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
