/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Deletefromcart } from "./Redux";
import "./cartstyle.css";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Cart = () => {
  const { data } = useSelector((state) => state.ReduxReducer);
  const { cartData } = useSelector((state) => state.cartreducer);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let t = 0;
    cartData.forEach((i) => {
      let c = i.count;
      while (c > 0) {
        t = t + i.price;
        c = c - 1;
      }
    });
    setTotal(t.toFixed());
  }, [cartData]);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "lightblue",
        height: "100vh",
        overflow: "scroll",
        paddingLeft: 30,
        paddingBottom: 20,
        paddingTop: 30,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {cartData.map((i) => {
          if (i.count > 0) {
            let tempcount = i.count;
            let mainprice = 0;
            while (tempcount > 0) {
              mainprice = mainprice + i.price;
              tempcount = tempcount - 1;
            }
            return (
              <div
                style={{
                  border: "1px solid black",
                  height: 400,
                  width: 300,
                  backgroundColor: "white",
                  marginRight: 30,
                  display: "flex",
                  justifyContent: "center",
                  paddingRight: 5,
                  paddingLeft: 5,
                }}
                className="cart"
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h1 style={{ alignSelf: "flex-end", marginLeft: 260 }}>
                    <MdDelete
                      onClick={() => {
                        // dispatch(Deletefromcart(i));
                        confirmAlert({
                          title: "Delete",
                          message:
                            "Are you sure, you want to delete this item?",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: () => dispatch(Deletefromcart(i)),
                            },
                            {
                              label: "No",
                              onClick: () => {},
                            },
                          ],
                          closeOnEscape: true,

                          keyCodeForClose: [8, 32],
                          overlayClassName: "overlay-custom-class-name",
                          closeOnClickOutside: true,
                        });
                      }}
                    />
                  </h1>
                  <img src={i.image} height={200} width={200} />
                  <div
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      fontSize: 18,
                      textAlign: "center",
                      color: "red",
                      fontWeight: "500",
                    }}
                  >
                    {i.title}
                  </div>
                  <div style={{ marginBottom: 10 }}>Quantity- {i.count}</div>
                  <div>Total Price -${`${mainprice}`}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div>
        <h>{total}</h>
      </div>
    </div>
  );
};

export default Cart;
