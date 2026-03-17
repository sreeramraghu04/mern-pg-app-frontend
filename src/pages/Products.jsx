import React, { useContext } from "react";
import productdata from "../common/productdata";
import CartContext from "../context/CartContext";
import { NavLink } from "react-router-dom";
/* import { Avatar, Badge, Space } from "antd"; */

const Products = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  {
    /* <Space size="middle">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={0} showZero>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>; */
  }

  return (
    <div className="min-h-screen p-8 bg-blue-100">
      <h1 className="text-3xl font-bold text-center mb-8">Products Page</h1>
      {/* <div className="flex justify-end mb-6">
        <NavLink
          to="/cart"
          className="flex items-center gap-3 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          <Badge count={cartItems.length} showZero>
            <Avatar shape="square" size="large" className="">
              🛒
            </Avatar>
          </Badge>
          <span className="font-medium">Cart</span>
        </NavLink>
      </div> */}
      <div className="flex justify-end mb-6">
        <NavLink
          to="/cart"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
        >
          Cart ({cartItems.length})
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productdata.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-6 bg-blue-200"
          >
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

            <p className="text-gray-500 mb-4">Price: ₹{product.price}/-</p>

            <button
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                setCartItems([...cartItems, product]);
                localStorage.setItem(
                  "cartItems",
                  JSON.stringify([...cartItems, product]),
                );
              }}
              /* onClick={() => {
                const updatedCart = [...cartItems, product];

                setCartItems(updatedCart);
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
              }} */
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
