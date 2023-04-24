import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, deleteCart, increment } from "../../Redux/cartAction";
import { DeleteTwoTone } from "@ant-design/icons";
const LazyImageComponent = lazy(() =>
  import("../../common/ImageComponent/index")
);

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [totalOfCart, setTotalOfCart] = useState(0);
  useEffect(() => {
    const getTotal = cartItems.reduce(
      (acc, curr) => acc + curr.count * curr.price,
      0
    );
    setTotalOfCart(getTotal);
  }, [cartItems]);
  return (
    <>
      <div className="p-8 underline ">
        <h1 className="font-bold text-3xl">Cart Items</h1>
      </div>
      <div
        className={`mx-3 h-[600px] overflow-scroll ${
          cartItems?.length < 1 && "flex justify-center items-center"
        }`}
      >
        {cartItems?.length ? (
          cartItems?.map((item) => {
            return (
              <>
                {" "}
                <div className=" grid mt-10 xl:grid-cols-3 lg:grid-cols-3 grid-flow-row-dense auto-rows-150 gap-5 relative place-items-center p-10  rounded-3xl shadow-2xl mx-20">
                  <div className="text-center">
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyImageComponent
                        src={item.image}
                        alt=""
                        height={200}
                        width={200}
                        className="m-auto"
                        style={{ height: "100px", width: "100px" }}
                      />
                    </Suspense>
                    <p>{item.title}</p>
                  </div>
                  <div className="flex justify-around items-center cursor-pointer text-2xl gap-10">
                    <p onClick={() => dispatch(increment(item))}>+</p>
                    <p>{item.count}</p>
                    <p
                      onClick={() => dispatch(decrement(item))}
                      className={`${item.count === 1 && "cursor-not-allowed"}`}
                    >
                      -
                    </p>
                  </div>
                  <p>{Math.floor(item.count * item.price)} RS.</p>
                  <div className="absolute top-5 right-7 font-bold text-2xl text-red-500">
                    <DeleteTwoTone onClick={() => dispatch(deleteCart(item))} />
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className=" text-center">
            <Suspense fallback={<div>Loading...</div>}>
              <LazyImageComponent
                src={require("../../assets/empty-cart.png")}
                alt="Your image"
                style={{ height: "200px", width: "200px" }}
              />
            </Suspense>
            <p className="font-bold text-3xl">NO DATA</p>
          </div>
        )}
      </div>
      <div className="flex gap-1 justify-end mx-20 mt-20 font-bold text-2xl items-center mb-10">
        <h1>TOTAL :-</h1>
        <br />
        <p>{Math.round(totalOfCart)} RS</p>
      </div>
    </>
  );
};

export default Cart;
