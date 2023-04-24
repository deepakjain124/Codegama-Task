import React, { Suspense, lazy, useEffect, useState } from "react";
import { getData } from "../../api/ApiCall";
import { addToCart } from "../../Redux/cartAction";
import { useDispatch } from "react-redux";
import { CloseCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { message } from "antd";
const LazyImageComponent = lazy(() =>
  import("../../common/ImageComponent/index")
);

const ProductList = () => {
  const [data, setData] = useState([]);
  const [duplicateData, setDuplicateData] = useState([]);
  const [categotry, setCategory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    message.open({
      type: "success",
      content: "Item Added to cart",
    });
  };
  const getProductItem = () => {
    getData()
      .then((i) => {
        const addCountKey = i.data.map((obj) => {
          return { ...obj, count: 1 };
        });
        setData(addCountKey);
        setDuplicateData(addCountKey);
        setCategory([...new Set(i.data.map((i) => i.category))]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductItem();
  }, []);
  const handleFilter = (e) => {
    let newdata = [...data];
    const filter = newdata?.filter((i) => i.category === e.target.value);
    setDuplicateData(filter);
  };
  return (
    <>
      <div className="flex justify-around items-center mt-5  flex-wrap">
        <h1 className="underline font-bold text-3xl">PRODUCT LIST</h1>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <h1 className=" font-semibold ">CATEGORIES</h1>
          <select name="category" id="category" onChange={handleFilter}>
            {categotry?.map((item, index) => {
              return (
                <>
                  <option value={item}>{item}</option>
                </>
              );
            })}
          </select>
          <p
            className=" cursor-pointer mb-4 text-purple-300  font-bold text-3xl "
            onClick={() => getProductItem()}
          >
            <CloseCircleFilled />
          </p>
        </div>
      </div>
      {!duplicateData?.length && (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      )}
      <div
        className={` grid lg:grid-cols-2 xl:grid-cols-3 gap-6 m-6  grid-flow-row  md:grid-cols-1 place-items-center mt-7 `}
      >
        {duplicateData?.length
          ? duplicateData?.map((item, index) => {
              return (
                <>
                  <div
                    className=" xl:w-96 p-10  text-center border border-black-600 shadow-md"
                    style={{ margin: "auto" }}
                  >
                    <Suspense fallback={<div>Loading...</div>}>
                      <LazyImageComponent
                        src={item.image}
                        alt=""
                        width="200"
                        style={{ margin: "auto", height: "200px" }}
                        onClick={() =>
                          navigate(`/item/${item.id}`, { state: item })
                        }
                      />
                    </Suspense>
                    <div className="">
                      <div className="flex justify-start gap-6 items-center mt-10">
                        <h1 className="font-bold">TITLE:-</h1>
                        <h1 className="uppercase">{item.title}</h1>
                      </div>
                      <div className="flex justify-start gap-6 items-center mt-7">
                        <p className="font-bold uppercase">CATEGORY:-</p>
                        <p className="uppercase">{item.category}</p>
                      </div>
                    </div>
                    <div className="button flex justify-around items-center mt-6">
                      <p className="font-bold text-xl">
                        Price:- {item.price} RS.
                      </p>
                      <button
                        className="border-solid hover:shadow-2xl p-2 text-white bg-purple-300 rounded-md"
                        onClick={() => {
                          dispatch(addToCart(item));
                          success();
                        }}
                      >
                        Add To cart
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default ProductList;
