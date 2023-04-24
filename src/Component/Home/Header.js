import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cartLength = useSelector((state) => state.cart.cartItems);
  return (
    <>
      <div className="flex flex-wrap justify-around items-center w-full h-14 bg-purple-300 ">
        <Link to="/">
          <p className="font-bold">FLIPKART CLONE</p>
        </Link>
        <Link to="/cart">
          <div className=" relative ">
            <p className="font-bold text-3xl"><ShoppingCartOutlined /></p>
            <p className="absolute -top-1 left-4 bg-white border border-purple-200 h-7 w-7 rounded-full text-center">
              {cartLength?.length}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Header;
