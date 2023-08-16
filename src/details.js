/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { Addtocart, setMainData } from "./Redux";

const Details = () => {
  const { data, status } = useSelector((state) => state.ReduxReducer);
  const dispatch = useDispatch();
  const [localcount, setLocalcount] = useState(1);
  const [cartData, setcartdata] = useState();
  const loc = useLocation();
  const nav = useNavigate();
  const notify = (msg) => toast(`${msg}`);
  useEffect(() => {
    let ind = data.findIndex((i) => i.title === loc.state.title);
    setcartdata(loc.state);
    data[ind].count === 1
      ? setLocalcount(loc.state.count)
      : setLocalcount(data[ind].count);
    console.log(loc.state);
  }, []);
  useEffect(() => {
    if (localcount <= 0) {
      setLocalcount(0);
      let index = data.findIndex((i) => i.title === loc.state.title);
      let tempdata = [...data];
      console.log("count", tempdata[index].count);
      let changedobj = {
        ...tempdata[index],
        count: 0,
      };
      tempdata.splice(index, 1, changedobj);
      dispatch(setMainData(tempdata));
      console.log("increment", data[index]);
      setcartdata(changedobj);
    }
  }, [localcount]);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "lightblue",
        overflow: "scroll",
        paddingTop: 50,
        flexDirection: "column",
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 30,
      }}
    >
      <div
        style={{
          alignSelf: "center",
          color: "red",
          fontFamily: "fantasy",
          fontSize: 28,
          textDecoration: "underline",
        }}
      >
        {loc.state.title}
      </div>
      <img
        src={loc.state.image}
        height={"70%"}
        width={"60%"}
        style={{ resize: "both", alignSelf: "center" }}
      ></img>
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 30,
          fontSize: 18,
          flexDirection: "row",
          display: "flex",
        }}
      >
        <div
          style={{
            color: "red",
            fontFamily: "fantasy",
            fontSize: 22,
          }}
        >
          Description-{" "}
        </div>
        {loc.state.description}
      </div>
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 30,
          fontSize: 18,
          flexDirection: "row",
          display: "flex",
        }}
      >
        <div style={{ color: "red", fontFamily: "fantasy", fontSize: 22 }}>
          Price-
        </div>
        <div style={{ paddingTop: 3, paddingLeft: 50 }}>${loc.state.price}</div>
      </div>
      <div
        style={{
          paddingLeft: 50,
          paddingTop: 30,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "red",
            fontFamily: "fantasy",
            fontSize: 22,
          }}
        >
          {" "}
          Quantity -
        </div>{" "}
        <div
          style={{
            fontSize: 22,
            paddingLeft: 20,
          }}
        >
          <h1
            style={{
              height: 30,
              width: 30,
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CgMathPlus
              size={30}
              onClick={() => {
                if (localcount >= 0) {
                  setLocalcount(localcount + 1);
                  let index = data.findIndex(
                    (i) => i.title === loc.state.title
                  );
                  let tempdata = [...data];
                  console.log("count", tempdata[index].count);
                  let changedobj = {
                    ...tempdata[index],
                    count: tempdata[index].count + 1,
                  };
                  tempdata.splice(index, 1, changedobj);
                  dispatch(setMainData(tempdata));
                  console.log("increment", data[index]);
                  setcartdata(changedobj);
                }
              }}
            />
          </h1>
        </div>
        <div style={{ fontSize: 28, paddingLeft: 30, paddingRight: 30 }}>
          {" "}
          {localcount > 0 ? localcount : 0}
        </div>
        <h6
          style={{
            height: 30,
            width: 30,
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CgMathMinus
            size={30}
            onClick={() => {
              if (localcount >= 0) {
                setLocalcount(localcount - 1);
                let index = data.findIndex((i) => i.title === loc.state.title);
                let tempdata = [...data];
                console.log("count", tempdata[index].count);
                let changedobj = {
                  ...tempdata[index],
                  count: tempdata[index].count - 1,
                };
                tempdata.splice(index, 1, changedobj);
                dispatch(setMainData(tempdata));
                console.log("increment", data[index]);
                setcartdata(changedobj);
              }
            }}
          />
        </h6>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            padding: 10,
            borderRadius: 5,
            boxShadow: "1px 1px 6px black",
            color: "white",
            fontWeight: "400",
            backgroundColor: "#0589f2",
          }}
          onClick={() => {
            dispatch(Addtocart(cartData));
            notify("Item added to cart successfully");
          }}
        >
          <ToastContainer />
          Add to cart
        </div>
        <div
          style={{
            padding: 10,
            borderRadius: 5,
            boxShadow: "1px 1px 6px black",
            color: "white",
            fontWeight: "400",
            backgroundColor: "#0589f2",
          }}
          onClick={() => {
            nav("/cart");
          }}
        >
          Go to cart
        </div>
      </div>
    </div>
  );
};
export default Details;
