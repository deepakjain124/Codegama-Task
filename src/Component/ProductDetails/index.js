import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../Redux/cartAction";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const params = useLocation();
  const [productDetail, setProductDetail] = useState(params.state);
  const dispatch = useDispatch();
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 md:gap-5 place-items-center mt-10">
        <div className="shadow-xl p-6">
          <img
            src={productDetail.image}
            alt=""
            style={{ width: "400px", height: "400px" }}
          />
        </div>
        <div className=" px-16">
          <h1 className="font-bold text-2xl">{productDetail.title}</h1>
          <p className="mt-5 font-normal text-xl">
            {productDetail.description}
          </p>
          <div className="flex text-lg font-medium justify-between items-center mt-10 ">
            <p>Stock Availabel</p>
            <p>{productDetail.rating.count}</p>
          </div>
          <div className="flex text-lg font-medium justify-between items-center mt-10">
            <p>Rating</p>
            <p>{productDetail.rating.rate}</p>
          </div>
          <button
            className="border-solid hover:shadow-2xl p-2 mt-5  text-white bg-purple-300 rounded-md"
            onClick={() => dispatch(addToCart(productDetail))}
          >
            Add To cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
