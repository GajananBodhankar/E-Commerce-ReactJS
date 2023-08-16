import React, { useEffect, useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { fetchData } from "./Redux";
import { setMainData } from "./Redux";
const Action = () => {
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.ReduxReducer);
  const [filterdata, setfilterdata] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.length === 0) {
      dispatch(fetchData());
      console.log("data", data);
    }
  }, []);
  useEffect(() => {
    console.log(status);
    if (status === "Successful" && data.length > 0) {
      setfilterdata(data);
      console.log("filterredata", filterdata);
    }
    // console.log(filterdata);
  }, [status]);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "lightblue",
        height: "100vh",
        overflow: "scroll",
        paddingLeft: 20,
        paddingBottom: 20,
      }}
    >
      <div>
        <div style={{ paddingLeft: "50vh" }}>
          <select
            onChange={(e) => {
              let temp = data.filter(
                (i) =>
                  i.category.includes(e.target.value) &&
                  i.category.startsWith(e.target.value)
              );
              if (temp.length > 0) {
                setfilterdata(temp);
                console.log("temp", temp, e.target.length);
              } else {
                setfilterdata(data);
              }
            }}
          >
            <option value="Select category" selected disabled>
              select category
            </option>
            <option value="All">All</option>
            <option value="men's clothing">men's clothing</option>

            <option value="jewelery">jewelery</option>

            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
          </select>
        </div>
        {data.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading
              height={100}
              width={100}
              color="#grey"
              type={"spin"}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            overflow: "scroll",
            paddingTop: 30,
          }}
        >
          {status === "Successful" &&
            filterdata.map((i, j) => {
              if (i.category === "men's clothing")
                return (
                  <div
                    onClick={(e) => {
                      let x = [...filterdata];
                      let temp = {
                        ...filterdata[j],
                        count:
                          filterdata[j].count === 0 ? 1 : filterdata[j].count,
                      };
                      x.splice(j, 1, temp);
                      setfilterdata(x);
                      dispatch(setMainData(x));
                      if (temp.count > 0) {
                        navigate("/details", { state: temp });
                      }
                    }}
                    style={{
                      backgroundColor: "white",
                      marginRight: 20,
                      height: "300px",
                      width: "270px",
                      flexDirection: "column",
                      display: "flex",
                      borderRadius: "10px",
                      border: "1px solid black",
                      paddingTop: "30px",
                      paddingLeft: "20px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{i.title} </div>
                    <div
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <img src={i.image} height={200} width={200} />
                    </div>
                    <div>{i.count}</div>
                    <div
                      style={{
                        paddingRight: "20px",
                        color: "red",
                        paddingBottom: "20px",
                        alignSelf: "flex-end",
                      }}
                    >
                      <div> Price- ${i.price}</div>
                    </div>
                  </div>
                );
            })}
        </div>
        <div
          style={{
            display: "flex",
            overflow: "scroll",
            paddingTop: 30,
          }}
        >
          {status == "Successful" &&
            filterdata.map((i, j) => {
              if (i.category === "jewelery") {
                return (
                  <div
                    onClick={(e) => {
                      let x = [...filterdata];
                      let temp = {
                        ...filterdata[j],
                        count:
                          filterdata[j].count === 0 ? 1 : filterdata[j].count,
                      };
                      x.splice(j, 1, temp);
                      setfilterdata(x);
                      dispatch(setMainData(x));
                      if (temp.count > 0) {
                        navigate("/details", { state: temp });
                      }
                    }}
                    style={{
                      backgroundColor: "white",
                      marginRight: 20,
                      height: "315px",
                      width: "270px",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      display: "flex",
                      borderRadius: "10px",
                      border: "1px solid black",
                      paddingTop: "30px",
                      paddingLeft: "20px",
                    }}
                  >
                    <div>{i.title} </div>
                    <div
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <img
                        src={i.image}
                        height={200}
                        width={200}
                        style={{ resizeMode: "cover", paddingTop: "20px" }}
                      />
                    </div>
                    <div
                      style={{
                        paddingRight: "20px",
                        color: "red",
                        paddingBottom: "20px",
                        alignSelf: "flex-end",
                      }}
                    >
                      <div> Price- ${i.price}</div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div
          style={{
            display: "flex",
            overflow: "scroll",
            paddingTop: 30,
            justifyContent: "center",
          }}
        >
          {status == "Successful" &&
            filterdata.map((i, j) => {
              if (i.category == "electronics") {
                return (
                  <div
                    onClick={(e) => {
                      let x = [...filterdata];
                      let temp = {
                        ...filterdata[j],
                        count:
                          filterdata[j].count === 0 ? 1 : filterdata[j].count,
                      };
                      x.splice(j, 1, temp);
                      setfilterdata(x);
                      dispatch(setMainData(x));
                      if (temp.count > 0) {
                        navigate("/details", { state: temp });
                      }
                    }}
                    style={{
                      backgroundColor: "white",
                      marginRight: 20,
                      height: "300px",
                      width: "270px",
                      flexDirection: "column",
                      display: "flex",
                      borderRadius: "10px",
                      border: "1px solid black",
                      paddingTop: "30px",
                      justifyContent: "space-around",

                      paddingLeft: "20px",
                    }}
                  >
                    <div>{i.title} </div>
                    <div
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <img src={i.image} height={200} width={200} />
                    </div>
                    <div
                      style={{
                        paddingRight: "20px",
                        color: "red",
                        paddingBottom: "20px",
                        alignSelf: "flex-end",
                      }}
                    >
                      <div> Price- ${i.price}</div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div
          style={{
            display: "flex",
            overflow: "scroll",
            paddingTop: 30,
            justifyContent: "center",
          }}
        >
          {status == "Successful" &&
            filterdata.map((i, j) => {
              if (i.category == "women's clothing") {
                return (
                  <div
                    onClick={(e) => {
                      let x = [...filterdata];
                      let temp = {
                        ...filterdata[j],
                        count:
                          filterdata[j].count === 0 ? 1 : filterdata[j].count,
                      };
                      x.splice(j, 1, temp);
                      setfilterdata(x);
                      dispatch(setMainData(x));
                      if (temp.count > 0) {
                        navigate("/details", { state: temp });
                      }
                    }}
                    style={{
                      backgroundColor: "white",
                      marginRight: 20,
                      height: "300px",
                      width: "270px",
                      flexDirection: "column",
                      display: "flex",
                      borderRadius: "10px",
                      border: "1px solid black",
                      paddingTop: "30px",
                      justifyContent: "space-between",
                      paddingLeft: "20px",
                    }}
                  >
                    <div>{i.title} </div>
                    <div
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <img
                        src={i.image}
                        height={200}
                        width={200}
                        style={{ resizeMode: "cover", resize: "" }}
                      />
                    </div>
                    <div
                      style={{
                        paddingRight: "20px",
                        color: "red",
                        paddingBottom: "20px",
                        alignSelf: "flex-end",
                      }}
                    >
                      <div> Price- ${i.price}</div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <Link to={"/"}>home</Link>
      </div>
    </div>
  );
};
export default Action;

//women's clothing
