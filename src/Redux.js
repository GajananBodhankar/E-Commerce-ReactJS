import React, { useEffect, useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

interface Iitems {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
  count: number;
}
interface Idata {
  data: Iitems[];
  status: "Idle" | "Successful" | "failed" | "loading";
}
const maindata: Idata = {
  data: [],
  status: "Idle",
};
interface Ival {
  username: string;
  password: string;
  status: "Idle" | "Successful" | "failed" | "loading";
}

const login: Ival = {
  username: "",
  password: "",
  status: "Idle",
};

interface Icart {
  id: number;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
  count: number;
}
interface Icartdata {
  cartData: Iitems[];
  status: "Idle" | "Successful" | "failed" | "loading";
}
const maincart: Icartdata = {
  cartData: [],
  status: "Idle",
};

const cartSlice = createSlice({
  name: "cartslice",
  initialState: maincart,
  reducers: {
    Addtocart: (state, action) => {
      let index = state.cartData?.findIndex(
        (i) => i.title === action.payload.title
      );

      if (index >= 0) {
        state.cartData.splice(index, 1, action.payload);
      } else {
        let tempdata = [...state.cartData, action.payload];
        let temp = Array.from(
          new Set(tempdata.map(JSON.stringify)),
          JSON.parse
        );
        state.cartData = temp;
      }
    },
    Deletefromcart: (state, action) => {
      let index = state.cartData.findIndex(
        (i) => i.title === action.payload.title
      );
      if (index >= 0) {
        state.cartData.splice(index, 1);
      }
    },
  },
});

const ValidateSlice = createSlice({
  name: "valslice",
  initialState: login,
  reducers: {
    setUser: (state, action) => {
      state.status = action.payload;
    },
    setPass: (state, action) => {
      state.password = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const fetchData = createAsyncThunk("fetch", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const Slice = createSlice({
  name: "Slice",
  initialState: maindata,
  reducers: {
    setMainData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = [];
        action.payload.forEach((i, j) => {
          state.data.push({
            id: i.id,
            title: i.title,
            price: i.price,
            image: i.image,
            description: i.description,
            category: i.category,
            count: 0,
          });
        });
        console.log("state", state.data);
        // state.data = action.payload;
        state.status = "Successful";
      })
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const { setPass, setUser, setUsername } = ValidateSlice.actions;
export const ValidateReducer = ValidateSlice.reducer;
export const { setMainData } = Slice.actions;
export const ReduxReducer = Slice.reducer;
export const cartreducer = cartSlice.reducer;
export const { Addtocart, Deletefromcart } = cartSlice.actions;
