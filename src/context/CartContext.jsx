import { useEffect } from "react";
import { useState, createContext } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let existingCartItems = localStorage.getItem("cartItems");
    if (existingCartItems) setCartItems(JSON.parse(existingCartItems));
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
